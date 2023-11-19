import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "../store/actions/course.actions";
import { areCoursesLoaded } from "../store/selectors/courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesIsLoaded) => {
        if (!this.loading && !coursesIsLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter((coursesIsLoaded) => coursesIsLoaded),
      first(),
      finalize(() => (this.loading = false)) // executes when observable is complete or an error occurs
    );
  }
}
