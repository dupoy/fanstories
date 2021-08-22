import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  favoriteCount!: number
  isFavorite!: boolean

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.favoriteCount = this.favoriteCountProps
    this.isFavorite = this.isFavoriteProps
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
