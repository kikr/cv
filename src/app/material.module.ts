import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatDatepickerModule,
         MatNativeDateModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
  Feature module for wrapping all Material Design components
  as suggested by the docs https://material.angular.io/guide/getting-started#step-3-import-the-component-modules
*/
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
