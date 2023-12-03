import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "../store/course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  loading = false;

  constructor(private courseEntityService: CourseEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.courseEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          /* To sumarize this function call will be produce a side effect under the hood, that triggers http request  
              and handle the data returned and store it into store.  
            */
          this.courseEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
