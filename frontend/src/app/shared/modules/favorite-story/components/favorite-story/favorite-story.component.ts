import { currentUserSelector } from 'src/app/auth/store/selectors';

import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { favoriteStoryAction } from '../../store/actions/favorite-story.action';

@Component({
  selector: 'app-favorite-story',
  templateUrl: './favorite-story.component.html',
  styleUrls: ['./favorite-story.component.scss'],
})
export class FavoriteStoryComponent implements OnInit {
  @Input('isFavorite') isFavoriteProps!: boolean
  @Input('favoriteCount') favoriteCountProps!: number
  @Input('storySlug') storySlugProps!: string
  @Input('storyAuthor') storyAuthorProps!: string

  favoriteCount!: number
  isFavorite!: boolean
  isAuthor!: boolean

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.favoriteCount = this.favoriteCountProps
    this.isFavorite = this.isFavoriteProps
    this.store
      .pipe(select(currentUserSelector))
      .subscribe(
        (currentUser) =>
          (this.isAuthor = this.storyAuthorProps === currentUser?.username)
      )
      .unsubscribe()
  }

  handleLike(): void {
    this.store.dispatch(
      favoriteStoryAction({
        isFavorite: this.isFavorite,
        slug: this.storySlugProps,
      })
    )
    this.isFavorite ? this.favoriteCount-- : this.favoriteCount++
    this.isFavorite = !this.isFavorite
  }
}
