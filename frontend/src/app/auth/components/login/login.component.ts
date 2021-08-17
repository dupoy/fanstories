import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import {
    IBackendErrors
} from '../../../shared/modules/backend-errors/types/backend-errors.interface';
import { loginAction } from '../../store/action/login.action';
import { backendErrorsSelector, isSubmittingSelector } from '../../store/selectors';
import { ILoginRequest } from '../../types/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  get email() {
    return this.form?.get('email')
  }

  get password() {
    return this.form?.get('password')
  }

  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<IBackendErrors | null | any>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector))
  }

  onSubmit(): void {
    const request: ILoginRequest = {
      user: this.form.value,
    }
    this.store.dispatch(loginAction({request}))
  }
}
