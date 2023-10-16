import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeInfo, onboardData } from "../../types/employee";

interface EmployeeState {
  info: EmployeeInfo | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
}

interface ErrorResponse {
  error: string;
}

interface EmployeeInfoResponse {
  personalInformation: EmployeeInfo;
}

const initialState: EmployeeState = {
  info: null,
  status: "idle",
  error: null,
};

export const submitOnboarding = createAsyncThunk(
  "employee/submitOnboarding",
  async (onboardData: onboardData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/submit-onboardingapplication",
        onboardData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      if (!axiosErr.response || !axiosErr.response.data.error) {
        // Some network or unknown error, let it go to the fallback error handling
        throw err;
      }
      return rejectWithValue(axiosErr.response.data);
    }
  }
);

export const fetchEmployeeInfo = createAsyncThunk<
  EmployeeInfo, // Return type on success
  string, // First argument to the payload creator (userId in this case)
  {
    rejectValue: ErrorResponse; // Type for the rejectWithValue
  }
>("employee/fetchInfo", async (userId: string, { rejectWithValue }) => {
  try {
    const res = await axios.get<EmployeeInfoResponse>(
      `http://localhost:3000/personal-information/${userId}`
    );
    return res.data.personalInformation;
  } catch (err) {
    const axiosErr = err as AxiosError<ErrorResponse>;
    if (!axiosErr.response || !axiosErr.response.data.error) {
      throw err; // Some network or unknown error, let it go to the fallback error handling
    }
    return rejectWithValue(axiosErr.response.data);
  }
});

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch employee info
    builder.addCase(fetchEmployeeInfo.fulfilled, (state, action) => {
      state.info = action.payload;
      state.status = "succeeded";
    });

    builder.addCase(fetchEmployeeInfo.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchEmployeeInfo.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload) {
        // Handle the error returned with rejectWithValue
        state.error = action.payload.error;
      } else {
        state.error = action.error.message;
      }
    });

    // submit onboarding
    builder.addCase(submitOnboarding.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(submitOnboarding.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(submitOnboarding.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
