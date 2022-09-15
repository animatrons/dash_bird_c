import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
