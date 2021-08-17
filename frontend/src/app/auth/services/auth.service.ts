import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/shared/types/current-user.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IAuthResponse } from '../types/auth-response.interface';
import { ILoginRequest } from '../types/login-request.interface';
import { IRegisterRequest } from '../types/register-request.interface';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  getUser(response: IAuthResponse): ICurrentUser {
    return response.user
  }

  register(data: IRegisterRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/auth/register'

    return this.http.post<IAuthResponse>(url, data).pipe(map(this.getUser))
  }

  login(data: ILoginRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/auth/login'

    return this.http.post<IAuthResponse>(url, data).pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<ICurrentUser> {
    const url = environment.apiUrl + '/auth'

    return this.http.get<IAuthResponse>(url).pipe(map(this.getUser))
  }
}
