import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { isLoggedIn, isLoggedOut } from "./auth/selectors/auth.selectors";
import { AuthState } from "./auth/reducers";
import { login, logout } from "./auth/actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  isLoggedIn: boolean;
  isLoggedOut: boolean;

  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {
    const userProfile = localStorage.getItem("user");

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    // this.store.pipe(select(isLoggedIn)).subscribe((isLoggedIn) => {
    //   this.isLoggedIn = isLoggedIn;
    // });

    // this.store.pipe(select(isLoggedOut)).subscribe((isLoggedOut) => {
    //   this.isLoggedOut = isLoggedOut;
    // });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
