import { Component, Injectable, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Cv, CvBuilder } from './models/cv';
import { CvService } from './services/cv.service';
import { Project } from '../cv-project/project';
import { CvProjectDataService } from '../cv-project/cv-project.data.service';
import { Subscription } from 'rxjs';

@Injectable()
@Component({
    templateUrl: './cv.create.component.html',
    styleUrls: ['./cv.create.component.css'],
    providers: [ CvService ]
})
export class CvCreateComponent implements OnDestroy {

    cvCreateForm: FormGroup;
    @Input() projects: Project[] = [];
    cvBuilder: CvBuilder;
    cvProjectDataServiceSubscription: Subscription;

    constructor(private formGroupBuilder: FormBuilder,
                private cvService: CvService,
                private cvProjectDataService: CvProjectDataService,
                private router: Router) {
        this.initCvForm();

        this.cvBuilder = new CvBuilder();
        this.cvProjectDataServiceSubscription = this.cvProjectDataService.projectData.subscribe(this.onProjectAdd.bind(this));
    }

    initCvForm(): any {
        this.cvCreateForm = this.formGroupBuilder.group({
            cvTitle: ['', Validators.required], // <--- the FormControl name
            userFirstName: ['', Validators.required],
            userLastName: ['', Validators.required]
        });
    }

    onCreate(): void {
        this.cvService.createCv(
            this.cvBuilder
            .setCvTitle(this.cvCreateForm.get('cvTitle').value)
            .setUserFirstName(this.cvCreateForm.get('userFirstName').value)
            .setUserLastName(this.cvCreateForm.get('userLastName').value)
            .build()
        )
        .subscribe(cv => {
            console.log(`Created CV`);
            // Navigate back to dashboard
            this.router.navigate(['/dashboard']);
        },
        (error) => console.error(error));
    }

    onProjectAdd(project: Project): any {
        console.log('Adding a project...');
        this.cvBuilder.addProject(project);
        // Sync with data model. I don't really like building each time, but it's not that heavy task
        this.projects = this.cvBuilder.build().getProjects();
    }

    ngOnDestroy(): void {
        this.cvProjectDataServiceSubscription.unsubscribe();
    }
}
