import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FavoriteStoryComponent } from './components/favorite-story/favorite-story.component';
import { FavoriteStoryService } from './services/favorite-story.service';
import { FavoriteStoryEffect } from './store/effects/favorite-story.effect';

@NgModule({
  declarations: [FavoriteStoryComponent],
  imports: [CommonModule, EffectsModule.forFeature([FavoriteStoryEffect])],
  exports: [FavoriteStoryComponent],
  providers: [FavoriteStoryService],
})
export class FavoriteStoryModule {}
