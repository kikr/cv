import { Component, OnInit, Input } from '@angular/core';
import { Cv, CvBuilder } from './../cv/models/cv';
import { CvService } from './../cv/services/cv.service';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';
import { CvBuilderStatefulService } from '../cv/cv.builder.stateful.service';
import { Project } from '../cv-project/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ CvService, MaterialModule ]
})
export class DashboardComponent implements OnInit {

  title = 'app';
  @Input() cvs: Cv[];
  columnsToDisplay = ['cvTitle', 'cvUserFirstName', 'cvUserLastName', 'cvAction'];

  constructor(private cvService: CvService,
              private cvBuilderService: CvBuilderStatefulService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('Getting CVs on init...');
    this.cvService.getCvs()
      .subscribe((cvs) => {
        this.cvs = cvs;
        // Start fresh
        this.cvBuilderService.reset();

        console.log(`Got ${cvs.length} CV(s)`);
      });
  }

  onUpdateCv(cv: Cv) {
    console.log('Update CV...');

    if (cv) {
      // Sibling components use CvBuilder to handle CV data, so we gotta do this
      this.cvBuilderService.updateCvBuilder(new CvBuilder()
        .setCvTitle(cv.title)
        .setUserFirstName(cv.user.firstName)
        .setUserLastName(cv.user.lastName)
        .setProjects(cv.projects));

      this.router.navigate(['cvs', cv._id, 'update']);
    } else {
      console.warn('Cannot update CV. No CV instance was passed by caller, this is very likely a bug');
    }
  }

  onReadCv(cv: Cv): void {
    console.log('Reading CV...');
    // TODO: CVs not casted properly, i.e. can't use getId-function
    const cvId = cv._id;

    if (cv) {
      // Sibling components use CvBuilder to handle CV data, so we gotta do this
      this.cvBuilderService.updateCvBuilder(new CvBuilder()
        .setCvTitle(cv.title)
        .setUserFirstName(cv.user.firstName)
        .setUserLastName(cv.user.lastName)
        .setProjects(cv.projects));

      this.router.navigate(['cvs', cvId, 'read']);
    } else {
      console.warn('Cannot show CV details. No CV instance was passed by caller, this is very likely a bug');
    }

  }
}
