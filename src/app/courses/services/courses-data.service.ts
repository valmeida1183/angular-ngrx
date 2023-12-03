import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Update } from "@ngrx/entity";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Course", http, httpUrlGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    return this.http
      .get("/api/courses") // here we specify exactly what is our Api endpoint
      .pipe(
        map((response) => response["payload"]) // here we handle and format the data retrivied from our backend Api.
      );
  }

  // update(update: Update<Course>, options?: HttpOptions): Observable<Course> {
  //   return this.http.put<Course>("/api/course/" + update.id, update);
  // }
}
