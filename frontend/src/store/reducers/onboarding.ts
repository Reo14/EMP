import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../types/error";
import { EmployeeInfo } from "../../types/employee";
import { setAuth } from "./auth";

interface onboardingState {
  data: EmployeeInfo;
  onboardingStatus: "Never submitted" | "Rejected" | "Pending" | "Approved";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
}

const initialState: onboardingState = {
  data: {} as EmployeeInfo,
  onboardingStatus: "Never submitted",
  status: "idle",
  error: null,
};

export const submitOnboarding = createAsyncThunk(
  "employee/submitOnboarding",
  async (onboardData: EmployeeInfo, { rejectWithValue, dispatch }) => {
    try {
      dispatch(date2string());
      await axios.put("http://localhost:3000/update-info", onboardData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return onboardData;
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

export const getOnboardingStatus = createAsyncThunk(
  "employee/getOnboardingStatus",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3000/status/${userId}`);
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

export const getOnboardingData = createAsyncThunk(
  "employee/getOnboardingData",
  async (username: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/personal-information/${username}`
      );
      dispatch(
        setAuth({
          email: res.data.employee.email,
          username: res.data.employee.username,
          userId: res.data.employee.userId,
        })
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

const onboardSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    date2string: (state) => {
      if (state.data.DOB instanceof Date)
        state.data.DOB = state.data.DOB.toISOString();
      if (state.data.employment.startDate instanceof Date)
        state.data.employment.startDate =
          state.data.employment.startDate.toISOString();
      if (state.data.employment.endDate instanceof Date)
        state.data.employment.endDate =
          state.data.employment.endDate.toISOString();
    },
  },
  extraReducers: (builder) => {
    // submit onboarding
    builder.addCase(submitOnboarding.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.onboardingStatus = "Pending";
    });
    builder.addCase(submitOnboarding.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(submitOnboarding.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // get onboarding data
    builder.addCase(getOnboardingData.fulfilled, (state, action) => {
      state.data = action.payload.employee;
      state.onboardingStatus = action.payload.employee.onboardStatus;
      state.status = "succeeded";
    });
    builder.addCase(getOnboardingData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getOnboardingData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // get onboarding status
    builder.addCase(getOnboardingStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.onboardingStatus = action.payload.onboardStatus;
    });
    builder.addCase(getOnboardingStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getOnboardingStatus.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { date2string } = onboardSlice.actions;
export default onboardSlice.reducer;
