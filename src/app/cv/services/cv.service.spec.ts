import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CvService } from './cv.service';
import { Cv, CvBuilder } from '../models/cv';

/**
 * https://angular.io/guide/http#testing-http-requests
 */
describe('CvService', () => {
    // TODO: Hard coded url
    const cvsPath = `api/cvs/`;
    let component: CvService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CvService]
        })
            .compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        component = TestBed.get(CvService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('#getCvs should send GET request', () => {
        const responseData: Cv[] = [new CvBuilder().setCvTitle('testicles').setUserFirstName('fomble').setUserLastName('barnicle').build()];

        // Make request
        component.getCvs().subscribe((cvs) => {
            // Test that service returns expected data
            expect(cvs).toBe(responseData);
        });
        // Test that request was made to HTTP client
        const request = httpTestingController.expectOne(cvsPath);

        // Mimic server response
        request.flush(responseData);
    });

    it('#createCv should send CV data as POST request', () => {
        const firstName = 'Rick';
        const lastName = 'Sanchez';
        const title = 'God';
        const cvUnsaved: Cv = new CvBuilder().setCvTitle(title).setUserFirstName(firstName).setUserLastName(lastName).build();

        // Make request
        component.createCv(cvUnsaved).subscribe((cvSaved) => {
            // Test that service returns expected data
            expect(cvSaved).toBe(cvUnsaved);
        });
        // Test that request was made to HTTP client
        // TODO: Hard coded url
        httpTestingController.expectOne((req: HttpRequest<any>) => {
            return req.method === 'POST'
                && req.url === cvsPath
                && JSON.stringify(req.body) === JSON.stringify({
                    user: { firstName, lastName }, title
                });
        }).flush(cvUnsaved);
    });
});
