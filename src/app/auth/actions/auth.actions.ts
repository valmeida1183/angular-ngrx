import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";

// This is a function called "action creator" to use when dispatch an action
export const login = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);

export const logout = createAction("[Top Menu] Logout");
