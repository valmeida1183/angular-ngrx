import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { delay, map, tap, withLatestFrom } from "rxjs/operators";
import { LessonEntityService } from "../store/lesson-entity.service";
import { CourseEntityService } from "../store/course-entity.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>;

  displayedColumns = ["seqNo", "description", "duration"];
  nextPage = 0;

  constructor(
    private route: ActivatedRoute,
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.courseEntityService.entities$.pipe(
      map((courses) => courses.find((course) => course.url === courseUrl))
    );

    this.lessons$ = this.lessonEntityService.entities$.pipe(
      // this operator add the last emitted value from an observable to stream, resulting in a tuple of two values, each of them comes from on of observables respectively.
      withLatestFrom(this.course$),
      tap(([lessons, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId == course.id)
      )
    );

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
  }

  loadLessonsPage(course: Course) {
    this.lessonEntityService.getWithQuery({
      courseId: course.id.toString(),
      pageNumber: this.nextPage.toString(),
      pageSize: "3",
    });

    this.nextPage += 1;
  }
}
