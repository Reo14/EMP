import { batch } from "react-redux";
import { AnyAction, Dispatch, Middleware } from "redux";

const resetStates: Middleware =
  (store) => (next: Dispatch) => (action: AnyAction) => {
    if (action.type === "auth/logOut") {
      batch(() => {
        store.dispatch({ type: "employee/reset" });
        store.dispatch({ type: "onboarding/reset" });
      });
    }
    return next(action);
  };

export default resetStates;
