import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { RequestService } from './http/request.service';
import { PersistenceService, STORAGE } from './services/persistence.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TimeService } from './utils/time.service';



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
    UserService,
    AuthGuard,
    TimeService
  ]
})
export class CoreModule { }
