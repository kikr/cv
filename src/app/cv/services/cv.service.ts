import { Cv } from '../models/cv';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CvService {
    private serverUrl = 'http://localhost';

    constructor(private httpClient: HttpClient) { }

    getCvs(): Observable<Cv[]> {
        console.log('Retrieving CVs...');
        return this.httpClient.get<Cv[]>(`${this.serverUrl}/cvs/`);
    }
}
