import { Component, Injectable, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Cv, CvBuilder } from './models/cv';
import { CvService } from './services/cv.service';
import { Project } from '../cv-project/project';
import { Subscription } from 'rxjs';
import { CvBuilderStatefulService } from './cv.builder.stateful.service';

export enum CvCreateFormFieldNames {
    cvTitle = 'cvTitle',
    userFirstName = 'userFirstName',
    userLastName = 'userLastName',
}

@Injectable()
@Component({
    templateUrl: './cv.create.component.html',
    styleUrls: ['./cv.create.component.css'],
    providers: [ CvService ]
})
export class CvCreateComponent {

    cvCreateForm: FormGroup;
    @Input() projects: Project[] = [];
    cvBuilder: CvBuilder;

    constructor(private formGroupBuilder: FormBuilder,
                private cvService: CvService,
                private cvBuilderService: CvBuilderStatefulService,
                private route: ActivatedRoute,
                private router: Router) {

        this.initCvForm();
        this.initCvBuilder();
        this.bindDataToView();
    }

    initCvBuilder(): void {
        // Subscribe briefly jsut to get the latest CvBuilder instance for updating it
        this.cvBuilderService.cvBuilderData
            .subscribe(cvBuilder => this.cvBuilder = cvBuilder)
            .unsubscribe();
    }

    initCvForm(): any {
        const formConfig = {};

        formConfig[CvCreateFormFieldNames.cvTitle] = ['', Validators.required];
        formConfig[CvCreateFormFieldNames.userFirstName] = ['', Validators.required];
        formConfig[CvCreateFormFieldNames.userLastName] = ['', Validators.required];

        this.cvCreateForm = this.formGroupBuilder.group(formConfig);
    }

    onCreate(): void {
        this.route.params.subscribe((params) => {
            const cvId = params.id;

            // If we got CV ID, it means this component is displaying existing CV's data
            if (cvId) {
                const cvWithId = this.getCvBuilder().build();
                cvWithId._id = cvId;

                this.cvService
                    .updateCv(cvWithId)
                    .subscribe(cv => {
                        console.log(`Created CV`);
                        // Reset because we dont want the forms use this data anymore
                        this.cvBuilderService.reset();
                        // Navigate back to dashboard
                        this.router.navigate(['/dashboard']);
                    },
                    (error) => console.error(error));
            } else {
                this.cvService
                    .createCv(this.getCvBuilder().build())
                    .subscribe(cv => {
                        console.log(`Updated CV`);
                        // Reset because we dont want the forms use this data anymore
                        this.cvBuilderService.reset();
                        // Navigate back to dashboard
                        this.router.navigate(['/dashboard']);
                    },
                    (error) => console.error(error));
            }
        });

    }

    bindDataToView(): void {
        console.log('Bind data to view');
        const cv = this.cvBuilder.build();
        const form = {};

        form[CvCreateFormFieldNames.cvTitle] = cv.getCvTitle();
        form[CvCreateFormFieldNames.userFirstName] = cv.getUserFirstName();
        form[CvCreateFormFieldNames.userLastName] = cv.getUserLastName();

        // Use patchValue instead of setValue to ignore any (validation) errors, because
        // it's possible to have em' at this point, like user has yet to submit all data.
        this.cvCreateForm.patchValue(form);

        this.projects = cv.getProjects();
    }

    /**
     * Return CV builder with latest data from the view
     */
    getCvBuilder(): CvBuilder {
        // Bind view to the builder
        this.cvBuilder
            .setCvTitle(this.cvCreateForm.get(CvCreateFormFieldNames.cvTitle).value)
            .setUserFirstName(this.cvCreateForm.get(CvCreateFormFieldNames.userFirstName).value)
            .setUserLastName(this.cvCreateForm.get(CvCreateFormFieldNames.userLastName).value);

        return this.cvBuilder;
    }

    onCreateProject() {
        console.log('Creating a project...');
        this.cvBuilderService.updateCvBuilder(this.getCvBuilder());
        this.router.navigate(['projects', 'create']);
    }

    onUpdateProject(project: Project) {
        console.log(`Updating ${project.title}-project...`);
        this.cvBuilderService.updateCvBuilder(this.getCvBuilder());
        this.router.navigate(['projects', project.getId(), 'update']);
    }
}
