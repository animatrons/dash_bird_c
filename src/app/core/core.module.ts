import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { RequestService } from './http/request.service';
import { PersistenceService, STORAGE } from './services/persistence.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    RequestService,
    PersistenceService,
    // { provide: STORAGE, useFactory: () => sessionStorage}
  ]
})
export class CoreModule { }
