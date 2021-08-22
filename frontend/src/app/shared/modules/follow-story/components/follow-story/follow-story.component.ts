import { currentUserSelector } from 'src/app/auth/store/selectors';
import { ICurrentUser } from 'src/app/shared/types/current-user.interface';

import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { followStoryAction } from '../../store/actions/follow-story.action';

@Component({
  selector: 'app-follow-story',
  templateUrl: './follow-story.component.html',
  styleUrls: ['./follow-story.component.scss'],
})
export class FollowStoryComponent implements OnInit {
  @Input('isFollow') isFollowProps!: boolean
  @Input('followCount') followCountProps!: number
  @Input('storySlug') storySlugProps!: string
  @Input('storyAuthor') storyAuthorProps!: string

  followCount!: number
  isFollow!: boolean

  currentUser!: ICurrentUser | null

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.followCount = this.followCountProps
    this.isFollow = this.isFollowProps
    this.store
      .pipe(select(currentUserSelector))
      .subscribe((currentUser) => (this.currentUser = currentUser))
      .unsubscribe()
  }

  handleFollow(): void {
    this.store.dispatch(
      followStoryAction({
        isFollow: this.isFollow,
        slug: this.storySlugProps,
      })
    )

    if (this.storyAuthorProps !== this.currentUser?.username) {
      this.isFollow ? this.followCount-- : this.followCount++
      this.isFollow = !this.isFollow
    }
  }
}
