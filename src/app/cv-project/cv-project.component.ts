import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  cvBuilder: CvBuilder;
  cvProjectForm: FormGroup;

  constructor(private formGroupBuilder: FormBuilder,
      private router: Router,
      private cvBuilderService: CvBuilderStatefulService) {

    this.initCvProjectForm();
    this.initCvBuilder();

  }

  initCvProjectForm(): any {
    this.cvProjectForm = this.formGroupBuilder.group({
      cvProjectTitle: ['', Validators.required],
      cvProjectStart: [null, Validators.required],
      cvProjectEnd: [null, Validators.required],
      cvProjectDescription: ['', Validators.required],
    });
  }

  initCvBuilder(): void {
    // Subscribe briefly jsut to get the latest CvBuilder instance for updating it with project
    this.cvBuilderService.cvBuilderData
        .subscribe(cvBuilder => this.cvBuilder = cvBuilder)
        .unsubscribe();
  }

  onCreate(): void {
    console.log('Adding project to CV...');

    const project = new Project();
    project.setId(this.generateProjectId());
    project.title = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectTitle).value;
    project.description = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectDescription).value;
    project.start = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectStart).value;
    project.end = this.cvProjectForm.get(CvProjectFormFieldNames.cvProjectEnd).value;

    this.cvBuilder.addProject(project);
    this.cvBuilderService.updateCvBuilder(this.cvBuilder);

    this.router.navigate(['/cvs']);
  }

  generateProjectId(): String {
    // TODO: How about UUID
    return (Math.random() * 10000000000000000).toString();
  }

}
