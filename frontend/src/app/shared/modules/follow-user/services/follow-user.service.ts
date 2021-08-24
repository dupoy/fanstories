import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { IProfileResponse } from '../../../../user-profile/types/profile-response.interface';
import { IProfile } from '../../../types/profile.interface';

@Injectable()
export class FollowUserService {
  constructor(private readonly http: HttpClient) {}

  followUser(username: string): Observable<IProfile> {
    const url = this.getUrl(username)

    return this.http.post<IProfileResponse>(url, {}).pipe(map(this.getProfile))
  }

  unfollowUser(username: string): Observable<IProfile> {
    const url = this.getUrl(username)

    return this.http
      .delete<IProfileResponse>(url, {})
      .pipe(map(this.getProfile))
  }

  getUrl(username: string) {
    return `${environment.apiUrl}/profiles/${username}/follow`
  }

  getProfile(response: IProfileResponse): IProfile {
    return response.profile
  }
}
