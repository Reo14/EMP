import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onboardData } from "../../types/onboarding";
import { ErrorResponse } from "../../types/error";

interface onboardingState {
  data: onboardData | null;
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

const onboardSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
});

export default onboardSlice.reducer;
