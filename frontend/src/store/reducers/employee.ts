import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeInfo } from "../../types/employee";
import { ErrorResponse } from "../../types/error";

interface EmployeeState {
  info: EmployeeInfo | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
}


interface EmployeeInfoResponse {
  personalInformation: EmployeeInfo;
}

const initialState: EmployeeState = {
  info: null,
  status: "idle",
  error: null,
};


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

const editEmployeeInfo = createAsyncThunk(
  "employee/edit",
  async (updatedInfo: EmployeeInfo, { rejectWithValue }) => {
    try {
      await axios.put(
        `http://localhost:3000/personal-information/${updatedInfo.userId}/edit`,
        updatedInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return updatedInfo;
    } catch (err) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      if (!axiosErr.response || !axiosErr.response.data.error) {
        throw err; // Some network or unknown error, let it go to the fallback error handling
      }
      return rejectWithValue(axiosErr.response.data);
    }
  }
);

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

    // edit employee info
    builder.addCase(editEmployeeInfo.fulfilled, (state, action) => {
      state.info = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(editEmployeeInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editEmployeeInfo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
