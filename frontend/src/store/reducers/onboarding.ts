import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onboardData } from "../../types/onboarding";
import { ErrorResponse } from "../../types/error";
import { EmployeeInfo } from "../../types/employee";

interface onboardingState {
  data: EmployeeInfo | null;
  onboardingStatus: "Never submitted" | "Rejected" | "Pending" | "Approved";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
}

const initialState: onboardingState = {
  data: null,
  onboardingStatus: "Never submitted",
  status: "idle",
  error: null,
};

export const submitOnboarding = createAsyncThunk(
  "employee/submitOnboarding",
  async (onboardData: EmployeeInfo, { rejectWithValue }) => {
    try {
      const regToken = localStorage.getItem("regToken");
      await axios.post(
        "http://localhost:3000/submit-onboardingapplication",
        onboardData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${regToken}`,
          },
        }
      );
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
  "employee/getOnboarding",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3000/status/${userId}`);
      return res.data.status;
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
  reducers: {},
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

    // get onboarding status
    builder.addCase(getOnboardingStatus.fulfilled, (state, action) => {
      state.status = "failed";
      state.onboardingStatus = action.payload;
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

export default onboardSlice.reducer;
