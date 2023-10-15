import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userData } from "../../types/auth";

interface authState {
  status: "idle" | "loading" | "failed" | "succeeded";
  isLoggedIn: boolean;
}

const initialState: authState = {
  status: "idle",
  isLoggedIn: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:3000/sign-up", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData: userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/sign-in", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // sign-up
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        console.log("Error in signing up: ", action.error);
      });
    // sign-in
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        console.log("Error in signing in: ", action.error);
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
