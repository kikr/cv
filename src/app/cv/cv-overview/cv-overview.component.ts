import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvBuilder } from '../models/cv';
import { CvBuilderStatefulService } from '../cv.builder.stateful.service';
import { Router } from '@angular/router';
import { CvCreateFormFieldNames } from '../cv.create.component';
import { Project } from '../../cv-project/project';

@Component({
  templateUrl: './cv-overview.component.html',
  styleUrls: ['../cv.create.component.css']
})
export class CvOverviewComponent {

  cvForm: FormGroup;
  @Input() projects: Project[] = [];
  cvBuilder: CvBuilder;

  constructor(private formGroupBuilder: FormBuilder,
              private cvBuilderService: CvBuilderStatefulService,
              private router: Router) {

      this.initCvForm();
  }


  initCvForm(): any {
      const formConfig = {};

      // Subscribe briefly jsut to get the latest CvBuilder instance for updating it
      this.cvBuilderService.cvBuilderData
      .subscribe(cvBuilder => {
        const cv = cvBuilder.build();

        formConfig[CvCreateFormFieldNames.cvTitle] = [cv.getCvTitle(), Validators.required];
        formConfig[CvCreateFormFieldNames.userFirstName] = [cv.getUserFirstName(), Validators.required];
        formConfig[CvCreateFormFieldNames.userLastName] = [cv.getUserLastName(), Validators.required];

        this.projects = cv.getProjects();

        this.cvForm = this.formGroupBuilder.group(formConfig);
      })
      .unsubscribe();
  }


  onReadProject(project: Project) {
      console.log(`Reading ${project.title}-project...`);
      this.router.navigate(['projects', project._id, 'read']);
  }
}
