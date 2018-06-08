import { MatTableModule, MatButtonModule} from '@angular/material';
import { NgModule } from '@angular/core';

/*
  Feature module for wrapping all Material Design components
  as suggested by the docs https://material.angular.io/guide/getting-started#step-3-import-the-component-modules
*/
@NgModule({
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
