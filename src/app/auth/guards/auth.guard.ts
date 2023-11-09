import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { isLoggedIn } from "../selectors/auth.selectors";
import { tap } from "rxjs/operators";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);

  return inject(Store<AuthState>).pipe(
    select(isLoggedIn),
    tap((isLogged) => {
      if (!isLogged) {
        router.navigateByUrl("/login");
      }
    })
  );
};
