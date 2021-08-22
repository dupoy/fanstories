import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FollowStoryComponent } from './components/follow-story/follow-story.component';
import { FollowStoryService } from './service/follow-story.service';
import { FollowStoryEffect } from './store/effects/follow-story.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([FollowStoryEffect])],
  declarations: [FollowStoryComponent],
  providers: [FollowStoryService],
  exports: [FollowStoryComponent],
})
export class FollowStoryModule {}
