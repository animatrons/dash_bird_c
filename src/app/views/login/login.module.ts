import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/effects/auth.effects';
import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPetitComponent } from './components/login-petit/login-petit.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    LoginPetitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [
    LoginPetitComponent
  ]
})
export class LoginModule { }
