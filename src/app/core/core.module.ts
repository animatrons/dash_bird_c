import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { RequestService } from './http/request.service';
import { PersistenceService, STORAGE } from './services/persistence.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    RequestService,
    PersistenceService,
    UserService
    // { provide: STORAGE, useFactory: () => sessionStorage}
  ]
})
export class CoreModule { }
