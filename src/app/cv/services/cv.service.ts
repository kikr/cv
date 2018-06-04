import { Cv } from '../models/cv';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CvService {
    private serverUrl = 'http://localhost';

    constructor(private httpClient: HttpClient) {
    }

    getCvs(): Observable<Cv[]> {
        console.log('Retrieving CVs...');
        return this.httpClient.get<Cv[]>(`${this.serverUrl}/cvs/`);
    }

    createCv(cv: Cv): Observable<Cv> {
        console.log('Creating CV...');
        return this.httpClient.post<Cv>(`${this.serverUrl}/cvs/`, cv);
    }
}
