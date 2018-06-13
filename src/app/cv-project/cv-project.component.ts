import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './project';
import { Subscription } from 'rxjs';
import { CvBuilder } from '../cv/models/cv';
import { CvBuilderStatefulService } from '../cv/cv.builder.stateful.service';

export enum CvProjectFormFieldNames {
  cvProjectTitle = 'cvProjectTitle',
  cvProjectDescription = 'cvProjectDescription',
  cvProjectStart = 'cvProjectStart',
  cvProjectEnd = 'cvProjectEnd',
}

@Component({
  templateUrl: './cv-project.component.html',
  styleUrls: ['./cv-project.component.css'],
})
export class CvProjectComponent {

  project: Project;
  cvBuilder: CvBuilder;
  cvProjectForm: FormGroup;

  constructor(private formGroupBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private cvBuilderService: CvBuilderStatefulService) {

    this.initCvBuilderAndForm();

  }

  /**
   *
   * @param project Project to intialize the form with. Should never be null
   */
  initCvProjectForm(project: Project): any {
    console.log('initCvProjectForm');

    this.cvProjectForm = this.formGroupBuilder.group({
      cvProjectTitle: [project.title, Validators.required],
      cvProjectStart: [project.start, Validators.required],
      cvProjectEnd: [project.end, Validators.required],
      cvProjectDescription: [project.description, Validators.required],
    });

    this.setProject(project);
  }

  initCvBuilderAndForm(): void {
    console.log('initCvBuilderAndForm');
    // Subscribe briefly jsut to get the latest CvBuilder instance for updating it with project
    this.cvBuilderService.cvBuilderData
        .subscribe(cvBuilder => {
          this.cvBuilder = cvBuilder;

          this.activatedRoute.params.subscribe((params) => {
            const urlProjectId = params['id'];
            const projects = cvBuilder.build().getProjects();
            const project = projects.find((proj) => proj.getId() === urlProjectId) || new Project();

            this.initCvProjectForm(project);
          });
        })
        .unsubscribe();
  }

  /**
   * Sets project instance representing this component
   */
  setProject(project: Project): any {
    this.project = project;
  }

  getProject(): Project {
    return this.project;
  }

  onCreate(): void {
    console.log('Adding project to CV...');
    const project = this.getProject();

    // Generate ID if needed. ID is used in routing editing existing projects, which can occur without talking with server
    if (!project.getId()) { project.setId(this.generateProjectId()); }
    project.title = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectTitle).value;
    project.description = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectDescription).value;
    project.start = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectStart).value;
    project.end = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectEnd).value;

    this.cvBuilder.addOrUpdateProject(project);
    this.cvBuilderService.updateCvBuilder(this.cvBuilder);

    this.router.navigate(['/cvs']);
  }

  generateProjectId(): String {
    // TODO: How about UUID
    return (Math.random() * 10000000000000000).toString();
  }

}
