import { PersistenceService } from 'src/app/shared/services/persistence.service';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BackendErrorsModule } from '../shared/modules/backend-errors/backend-errors.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { GetCurrentUserEffect } from './store/effects/get-current-user.effect';
import { LoginEffect } from './store/effects/login.effect';
import { LogoutEffect } from './store/effects/logout.effect';
import { RegisterEffect } from './store/effects/register.effect';
import { reducer } from './store/reducers';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackendErrorsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      LoginEffect,
      RegisterEffect,
      GetCurrentUserEffect,
      LogoutEffect,
    ]),
  ],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
