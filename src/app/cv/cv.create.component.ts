import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Cv, CvBuilder } from './models/cv';
import { CvService } from './services/cv.service';

@Injectable()
@Component({
    templateUrl: './cv.create.component.html',
    providers: [CvService]
})
export class CvCreateComponent {

    cvCreateForm: FormGroup;

    constructor(private formGroupBuilder: FormBuilder,
                private cvService: CvService) {
        this.initCvForm();
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
            new CvBuilder()
            .setCvTitle(this.cvCreateForm.get('cvTitle').value)
            .setUserFirstName(this.cvCreateForm.get('userFirstName').value)
            .setUserLastName(this.cvCreateForm.get('userLastName').value)
            .build()
        )
        .subscribe(cv => {
            console.log(`Created CV: ${cv}`);
        });
    }
}
