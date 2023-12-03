import { Injectable } from "@angular/core";
import { Lesson } from "../model/lesson";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";

@Injectable()
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Lesson", serviceElementsFactory);
  }
}
