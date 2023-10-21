import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import employeeSlice from "./reducers/employee";
import onboardingSlice from "./reducers/onboarding";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    onboarding: onboardingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
