import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CvCreateComponent } from './cv/cv.create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CvCreateComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'cvs', component: CvCreateComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },  // TODO: PageNotFoundComponent
    ], { useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
