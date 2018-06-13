import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CvCreateComponent } from './cv/cv.create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CvProjectComponent } from './cv-project/cv-project.component';
import { CvBuilderStatefulService } from './cv/cv.builder.stateful.service';
import { CvProjectOverviewComponent } from './cv-project/cv-project-overview/cv-project-overview.component';
import { CvOverviewComponent } from './cv/cv-overview/cv-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    CvCreateComponent,
    DashboardComponent,
    CvProjectComponent,
    CvProjectOverviewComponent,
    CvOverviewComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,  // MaterialModule needs to come after BrowserModule
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'cvs/create', component: CvCreateComponent },
      { path: 'cvs/:id/read', component: CvOverviewComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects/create', component: CvProjectComponent },
      { path: 'projects/:id/read', component: CvProjectOverviewComponent },
      { path: 'projects/:id/update', component: CvProjectComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },  // TODO: PageNotFoundComponent
    ], { useHash: true, enableTracing: false })
  ],
  providers: [ CvBuilderStatefulService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
