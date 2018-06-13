import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CvProjectFormFieldNames } from '../cv-project.component';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { CvBuilderStatefulService } from '../../cv/cv.builder.stateful.service';
import { CvBuilder } from '../../cv/models/cv';
import { switchMap } from 'rxjs/operators';
import { Project } from '../project';

@Component({
  selector: 'app-cv-project-overview',
  templateUrl: './cv-project-overview.component.html',
  styleUrls: ['../cv-project.component.css']
})
export class CvProjectOverviewComponent implements OnInit {

  cvProjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private cvBuilderService: CvBuilderStatefulService) {
    this.initCvProjectForm();
    this.bindCvToView();
  }

  ngOnInit() {
  }

  initCvProjectForm(): any {
    const formConfig = {};

    formConfig[CvProjectFormFieldNames.cvProjectTitle] = [''];
    formConfig[CvProjectFormFieldNames.cvProjectDescription] = [' '];
    formConfig[CvProjectFormFieldNames.cvProjectStart] = [''];
    formConfig[CvProjectFormFieldNames.cvProjectEnd] = [''];

    this.cvProjectForm = this.formBuilder.group(formConfig);
  }

  bindCvToView(): any {
    this.cvBuilderService.cvBuilderData.subscribe(this.bindProjectToView.bind(this)).unsubscribe();
  }

  bindProjectToView(cvBuilder: CvBuilder): void {
    console.log('Binding project to view...');
    const formValues = {};

    this.activatedRoute.params.subscribe((params: Params) => {
      const projectId = params['id'];
      const projects = cvBuilder.build().getProjects();
      const project: Project = projects.find((proj) => proj.getId() === projectId);

      if (project) {
        formValues[CvProjectFormFieldNames.cvProjectTitle] = project.title;
        formValues[CvProjectFormFieldNames.cvProjectDescription] = project.description;
        formValues[CvProjectFormFieldNames.cvProjectStart] = project.start;
        formValues[CvProjectFormFieldNames.cvProjectEnd] = project.end;

        this.cvProjectForm.setValue(formValues);
      } else {
        console.warn('Project matching ID in URL could not be found. User can still continue using the app but this should be fixed.');
      }

    });
  }

}
