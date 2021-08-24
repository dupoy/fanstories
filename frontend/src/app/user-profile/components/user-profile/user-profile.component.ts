import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/shared/types/current-user.interface';
import { IProfile } from 'src/app/shared/types/profile.interface';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { currentUserSelector } from '../../../auth/store/selectors';
import { UtilsService } from '../../../shared/services/utils.service';
import { getProfileAction } from '../../store/actions/get-profile.action';
import {
    backendErrorsSelector, isLoadingSelector, userProfileSelector
} from '../../store/selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile!: IProfile
  isLoading$!: Observable<boolean>
  backendErrors$!: Observable<string | null>
  isCurrentUserProfile$!: Observable<boolean>

  username!: string | null
  apiUrl!: string

  userProfileSubscription!: Subscription

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.initialValues()
    this.initialListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) this.userProfileSubscription.unsubscribe()
  }

  initialValues(): void {
    const isFavorites = this.router.url.includes('favorites')
    const isFollowes = this.router.url.includes('followes')
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector))

    this.username = this.route.snapshot.paramMap.get('username')
    this.apiUrl = isFavorites
      ? `/stories?favorited=${this.username}`
      : isFollowes
      ? `/stories?followed=${this.username}`
      : `/stories?author=${this.username}`

    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(
        select(currentUserSelector),
        filter(this.utilsService.isNotNull)
      ),
      this.store.pipe(
        select(userProfileSelector),
        filter(this.utilsService.isNotNull)
      )
    ).pipe(
      map(
        ([currentUser, userProfile]: [ICurrentUser, IProfile]) =>
          currentUser.username === userProfile.username
      )
    )
  }

  initialListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector), filter(this.utilsService.isNotNull))
      .subscribe((userProfile: IProfile) => (this.userProfile = userProfile))
  }

  fetchData(): void {
    if (this.username)
      this.store.dispatch(getProfileAction({username: this.username}))
  }
}
