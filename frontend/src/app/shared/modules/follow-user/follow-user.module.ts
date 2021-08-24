import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FollowUserComponent } from './components/follow-user/follow-user.component';
import { FollowUserService } from './services/follow-user.service';
import { FollowUserEffect } from './store/effects/follow-user.effect';

@NgModule({
  declarations: [FollowUserComponent],
  imports: [CommonModule, EffectsModule.forFeature([FollowUserEffect])],
  providers: [FollowUserService],
  exports: [FollowUserComponent],
})
export class FollowUserModule {}
