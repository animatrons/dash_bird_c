import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertModule } from '../alert/alert.module';
import { LoginPetitComponent } from '../login/components/login-petit/login-petit.component';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeProfileComponent,
    WelcomeComponent
  ],
  imports: [
    AlertModule,
    CommonModule,
    LoginModule,
    HomeRoutingModule,
    FormsModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbDropdownModule
  ]
})
export class HomeModule { }
