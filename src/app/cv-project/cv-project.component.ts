import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CvProjectDataService } from './cv-project.data.service';
import { Project } from './project';

@Component({
  templateUrl: './cv-project.component.html',
  styleUrls: ['./cv-project.component.css'],
})
export class CvProjectComponent {
  cvProjectForm: FormGroup;

  constructor(private formGroupBuilder: FormBuilder,
      private router: Router,
      private projectDataService: CvProjectDataService) {
    this.initCvProjectForm();
  }

  initCvProjectForm(): any {
    this.cvProjectForm = this.formGroupBuilder.group({
      cvProjectTitle: ['', Validators.required],
      cvProjectStart: [null, Validators.required],
      cvProjectEnd: [null, Validators.required],
      cvProjectDescription: ['', Validators.required],
    });
  }

  onCreate(): void {
    console.log('Adding project to CV...');

    const project = new Project();
    project.title = this.cvProjectForm.get('cvProjectTitle').value;
    project.description = this.cvProjectForm.get('cvProjectDescription').value;
    project.start = this.cvProjectForm.get('cvProjectStart').value;
    project.end = this.cvProjectForm.get('cvProjectEnd').value;

    this.projectDataService.updateProject(project);

    this.router.navigate(['/cvs']);
    // Pass the project to CvCreateComponent
  }

}
