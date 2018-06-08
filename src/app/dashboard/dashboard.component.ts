import { Component, OnInit, Input } from '@angular/core';
import { Cv } from './../cv/models/cv';
import { CvService } from './../cv/services/cv.service';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ CvService, MaterialModule ]
})
export class DashboardComponent implements OnInit {

  title = 'app';
  @Input() cvs: Cv[];
  columnsToDisplay = ['cvTitle', 'cvUserFirstName', 'cvUserLastName'];

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    console.log('Getting CVs on init...');
    this.cvService.getCvs()
      .subscribe((cvs) => {
        this.cvs = cvs;
        console.log(`Got ${cvs.length} CV(s)`);
      });
  }

}
