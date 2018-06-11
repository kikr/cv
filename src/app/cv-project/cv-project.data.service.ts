import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class CvProjectDataService {

  private projectDataSource = new BehaviorSubject<Project>(new Project());
  projectData: Observable<Project> = this.projectDataSource.asObservable();

  constructor() { }

  updateProject(project: Project) {
    this.projectDataSource.next(project);
  }
}
