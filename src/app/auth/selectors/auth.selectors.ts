import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

// Selectors is a memoized function it means that this function keeps memory of previous execution and only executes if the
// inputs of the function have not been calculated before otherwise returns previous calculed thas is cached.
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);
export const isLoggedOut = createSelector(
  isLoggedIn,
  (isLoggedIn) => !isLoggedIn
);
