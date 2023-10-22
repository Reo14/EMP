import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authData } from "../../types/auth";

interface authState {
  status: "idle" | "loading" | "failed" | "succeeded";
  isLoggedIn: boolean;
  email: string;
  username: string;
  userId: string;
  error: string | undefined | null;
  query: boolean | "standby";
}

export interface queryData {
  type: string;
  value: string;
}

const initialState: authState = {
  isLoggedIn: false,
  email: "",
  username: "",
  userId: "",
  status: "idle",
  error: null,
  query: "standby",
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: authData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:3000/sign-up", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (!axiosErr.response) {
        throw err; // Some network or unknown error, let it go to the fallback error handling
      }
      return rejectWithValue(axiosErr.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData: authData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/sign-in", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (!axiosErr.response) {
        throw err; // Some network or unknown error, let it go to the fallback error handling
      }
      return rejectWithValue(axiosErr.response.data);
    }
  }
);

export const queryInfo = createAsyncThunk(
  "query",
  async (queryData: queryData, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/query?type=${queryData.type}&value=${queryData.value}`
      );
      return res.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (!axiosErr.response) {
        throw err; // Some network or unknown error, let it go to the fallback error handling
      }
      return rejectWithValue(axiosErr.response.data);
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
    saveUser: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
  extraReducers: (builder) => {
    // query
    builder
      .addCase(queryInfo.fulfilled, (state, action) => {
        state.query = action.payload.exists as boolean;
      })
      .addCase(queryInfo.rejected, (state, action) => {
        state.status = "failed";
        console.log("Query Error: ", action.payload);
      });
    // sign-up
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.userId = action.payload.userId
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
        localStorage.setItem("regToken", action.payload.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        console.log("Error in signing in: ", action.error);
      });
  },
});

export const { logIn, logOut, saveUser } = authSlice.actions;

export default authSlice.reducer;
