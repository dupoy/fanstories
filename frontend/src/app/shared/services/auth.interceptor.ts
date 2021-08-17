import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PersistenceService } from './persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly persistenceService: PersistenceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.persistenceService.get('accessToken')

    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    })

    return next.handle(request)
  }
}
