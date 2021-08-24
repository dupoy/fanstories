import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProfile } from '../../shared/types/profile.interface';
import { IProfileResponse } from '../types/profile-response.interface';

@Injectable()
export class UserProfileService {
  constructor(private readonly http: HttpClient) {}

  getUserProfile(username: string): Observable<IProfile> {
    const url = `${environment.apiUrl}/profiles/${username}`

    return this.http
      .get<IProfileResponse>(url)
      .pipe(map((response: IProfileResponse) => response.profile))
  }
}
