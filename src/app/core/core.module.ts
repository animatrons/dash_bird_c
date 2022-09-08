import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { RequestService } from './http/request.service';
import { PersistenceService } from './services/persistence.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    RequestService,
    PersistenceService
  ]
})
export class CoreModule { }
