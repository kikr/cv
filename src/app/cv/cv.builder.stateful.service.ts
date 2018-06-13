import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CvBuilder } from './models/cv';

/**
 * Service meant for passing {@link CvBuilder} instance between components.
 *
 * This is used in sibling component situation, where component A routes user to component B and
 * back to component A, and we want to persist data of them both during this flow.
 */
@Injectable({
  providedIn: 'root'
})
export class CvBuilderStatefulService {

  // BehaviorSubject keeps the last emitted value and emits it immediately to new subscribers.
  private cvBuilderDataSource = new BehaviorSubject<CvBuilder>(new CvBuilder());
  cvBuilderData: Observable<CvBuilder> = this.cvBuilderDataSource.asObservable();

  constructor() { }

  updateCvBuilder(cvBuilder: CvBuilder) {
    this.cvBuilderDataSource.next(cvBuilder);
  }

  /**
   * "Resets" the CV builder by setting current value to empty CvBuilder
   */
  reset() {
    this.cvBuilderDataSource.next(new CvBuilder());
  }
}
