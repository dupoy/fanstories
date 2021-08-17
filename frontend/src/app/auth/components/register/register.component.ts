import { Observable } from 'rxjs';
import {
    IBackendErrors
} from 'src/app/shared/modules/backend-errors/types/backend-errors.interface';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { registerAction } from '../../store/action/register.action';
import { backendErrorsSelector, isSubmittingSelector } from '../../store/selectors';
import { IRegisterRequest } from '../../types/register-request.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form?: FormGroup

  get email() {
    return this.form?.get('email')
  }

  get password() {
    return this.form?.get('password')
  }

  get username() {
    return this.form?.get('username')
  }

  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<IBackendErrors | null | any>

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
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
    const request: IRegisterRequest = {
      user: {...this.form?.value},
    }

    this.store.dispatch(registerAction({request}))
  }
}
