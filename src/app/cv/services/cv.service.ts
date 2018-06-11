import { Cv } from '../models/cv';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

enum CvResourceUrls {
    cvCollectionUrl = 'api/cvs/',
}

@Injectable()
export class CvService {
    constructor(private httpClient: HttpClient) {
    }

    getCvs(): Observable<Cv[]> {
        console.log('Retrieving CVs...');
        return this.httpClient.get<Cv[]>(CvResourceUrls.cvCollectionUrl);
    }

    createCv(cv: Cv): Observable<Cv> {
        console.log('Creating CV...');
        return this.httpClient.post<Cv>(CvResourceUrls.cvCollectionUrl, cv);
    }
}
