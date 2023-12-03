import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { CourseEntityService } from "../store/course-entity.service";
import { map } from "rxjs/operators";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private coursesEntityService: CourseEntityService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.promoTotal$ = this.coursesEntityService.entities$.pipe(
      map((courses) => courses.filter((course) => course.promo).length)
    );

    this.beginnerCourses$ = this.coursesEntityService.entities$.pipe(
      map((courses) => this.filterCoursesByCategory(courses, "BEGINNER"))
    );

    this.advancedCourses$ = this.coursesEntityService.entities$.pipe(
      map((courses) => this.filterCoursesByCategory(courses, "ADVANCED"))
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }

  private filterCoursesByCategory(
    courses: Course[],
    category: string
  ): Course[] {
    return courses.filter((course) => course.category === category);
  }
}
