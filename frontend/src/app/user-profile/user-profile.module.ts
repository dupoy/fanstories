import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FollowUserModule } from '../shared/modules/follow-user/follow-user.module';
import { StoriesModule } from '../shared/modules/stories/stories.module';
import { UtilsService } from '../shared/services/utils.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { GetProfileEffect } from './store/effects/get-profile.effect';
import { reducer } from './store/reducers';

const routes: Routes = [
  {
    path: 'profiles/:username',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:username/favorites',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:username/followes',
    component: UserProfileComponent,
  },
]

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    StoriesModule,
    FollowUserModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('userProfile', reducer),
    EffectsModule.forFeature([GetProfileEffect]),
  ],
  providers: [UserProfileService, UtilsService],
})
export class UserProfileModule {}
