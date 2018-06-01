import { Component, OnInit } from '@angular/core';
import { Cv } from './../cv/models/cv';
import { CvService } from './../cv/services/cv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ CvService ]
})
export class DashboardComponent implements OnInit {

  title = 'app';
  cvs: Cv[];

  constructor(private cvService: CvService) {

  }

  ngOnInit(): void {
    console.log('Getting CVs on init...');
    this.cvs = this.cvService.getCvs();
    console.log(this.cvs);
  }

}
