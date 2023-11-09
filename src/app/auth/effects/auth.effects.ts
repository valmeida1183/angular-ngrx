import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../actions/action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  // createEffect will subscribe the actions$ observable automatically
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        // ofType is a ngRx effects operator that filters actions by type
        ofType(AuthActions.login),
        tap((action) =>
          localStorage.setItem("user", JSON.stringify(action.user))
        )
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem("user");
          this.router.navigateByUrl("/login");
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
