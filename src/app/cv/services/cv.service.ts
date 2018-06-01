import { Cv } from "../models/cv";
import { Injectable } from "@angular/core";

Injectable()
export class CvService{
    getCvs(): Cv[] {
        console.log('Retrieving CVs...');
        return [
            {
              "firstName": "Kim",
              "lastName": "Kraft"
            }
        ];
    }
}