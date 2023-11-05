import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../actions/action-types";

export const authFeatureKey = "auth";
export interface AuthState {
  user: User;
}
export const initialAuthState: AuthState = {
  user: undefined,
};

// export const reducers: ActionReducerMap<AuthState> = {

// };

// Creates a Reducer function that defines what the store should do in response of login action.
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return { user: action.user };
  })
);
