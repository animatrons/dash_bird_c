import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from '../../store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/effects/auth.effects';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class LoginModule { }
