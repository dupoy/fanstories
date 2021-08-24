import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { currentUserSelector } from '../../../../../auth/store/selectors';
import { followUserAction } from '../../store/actions/follow-user.action';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss'],
})
export class FollowUserComponent implements OnInit {
  @Input('profileUsername') profileUsernameProps!: string
  @Input('isFollow') isFollowProps!: boolean

  isFollow!: boolean
  isCurrentUserProfile!: boolean

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initialValues()
  }

  initialValues(): void {
    this.isFollow = this.isFollowProps
    this.store
      .pipe(select(currentUserSelector))
      .subscribe(
        (currentUser) =>
          (this.isCurrentUserProfile =
            this.profileUsernameProps === currentUser?.username)
      )
      .unsubscribe()
  }

  handleFollow() {
    this.store.dispatch(
      followUserAction({
        isFollow: this.isFollow,
        username: this.profileUsernameProps,
      })
    )

    this.isFollow = !this.isFollow
  }
}
