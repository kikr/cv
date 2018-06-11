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
import { CvProjectDataService } from './cv-project/cv-project.data.service';


@NgModule({
  declarations: [
    AppComponent,
    CvCreateComponent,
    DashboardComponent,
    CvProjectComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MaterialModule,  // MaterialModule needs to come after BrowserModule
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'cvs', component: CvCreateComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project', component: CvProjectComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },  // TODO: PageNotFoundComponent
    ], { useHash: true})
  ],
  providers: [ CvProjectDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
