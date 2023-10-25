import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import { EmployeeInfo } from "../../types/employee";
import { ErrorResponse } from "../../types/error";

interface EmployeeState {
  info: EmployeeInfo;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
}

interface EmployeeInfoResponse {
  employee: EmployeeInfo;
}

const initialState: EmployeeState = {
  info: {} as EmployeeInfo,
  status: "idle",
  error: null,
};

export const fetchEmployeeInfo = createAsyncThunk<
  EmployeeInfo,
  string,
  { rejectValue: ErrorResponse }
>(
  "employee/fetchInfo",
  async (username: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(date2string());
      const res = await axios.get<EmployeeInfoResponse>(
        `http://localhost:3000/personal-information/${username}`
      );
      return res.data.employee;
    } catch (err) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      if (!axiosErr.response || !axiosErr.response.data.error) {
        throw err; // Some network or unknown error, let it go to the fallback error handling
      }
      return rejectWithValue(axiosErr.response.data);
    }
  }
);

export const editEmployeeInfo = createAsyncThunk(
  "employee/edit",
  async (updatedInfo: EmployeeInfo, { rejectWithValue }) => {
    try {
      await axios.put("http://localhost:3000/update-info", updatedInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
  reducers: {
    date2string: (state) => {
      if (state.info.DOB instanceof Date)
        state.info.DOB = state.info.DOB.toISOString();
      if (state.info.employment.startDate instanceof Date)
        state.info.employment.startDate =
          state.info.employment.startDate.toISOString();
      if (state.info.employment.endDate instanceof Date)
        state.info.employment.endDate =
          state.info.employment.endDate.toISOString();
    },
    reset: () => {
      return { ...initialState };
    },
  },
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

export const { date2string, reset } = employeeSlice.actions;

// selectors
export const isHR = (state: { employee: EmployeeState }) =>
  state.employee.info?.role === "HR";

export default employeeSlice.reducer;
