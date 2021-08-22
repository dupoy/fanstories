import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FavoriteStoryModule } from '../favorite-story/favorite-story.module';
import { FollowStoryModule } from '../follow-story/follow-story.module';
import { StoriesComponent } from './components/stories/stories.component';
import { StoriesService } from './services/stories.service';
import { GetStoriesEffect } from './store/effects/get-stories.effect';
import { reducer } from './store/reducers';

@NgModule({
  declarations: [StoriesComponent],
  imports: [
    CommonModule,
    FavoriteStoryModule,
    FollowStoryModule,
    StoreModule.forFeature('stories', reducer),
    EffectsModule.forFeature([GetStoriesEffect]),
    RouterModule,
  ],
  providers: [StoriesService],
  exports: [StoriesComponent],
})
export class StoriesModule {}
