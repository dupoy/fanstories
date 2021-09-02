import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FavoriteStoryModule } from '../shared/modules/favorite-story/favorite-story.module';
import { FollowStoryModule } from '../shared/modules/follow-story/follow-story.module';
import { FollowUserModule } from '../shared/modules/follow-user/follow-user.module';
import { CreateStoryComponent } from './components/create-story/create-story.component';
import { StoryComponent } from './components/story/story.component';
import { UpdateStoryComponent } from './components/update-story/update-story.component';
import { StoryService } from './services/story.service';
import { CreateStoryEffect } from './store/effects/create-story.effect';
import { DeleteStoryEffect } from './store/effects/delete-story.effect';
import { GetStoryEffect } from './store/effects/get-story.effect';
import { UpdateStoryEffect } from './store/effects/update-story.effect';
import { reducer } from './store/reducers';

const routes: Routes = [
  {path: 'stories/create', component: CreateStoryComponent, pathMatch: 'full'},
  {path: 'stories/:slug', component: StoryComponent, pathMatch: 'full'},
  {
    path: 'stories/:slug/update',
    component: UpdateStoryComponent,
    pathMatch: 'full',
  },
  {
    path: 'stories/:slug/chapters/:chapterSlug',
    component: StoryComponent,
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [StoryComponent, CreateStoryComponent, UpdateStoryComponent],
  imports: [
    CommonModule,
    FollowStoryModule,
    FavoriteStoryModule,
    FollowUserModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('story', reducer),
    EffectsModule.forFeature([
      GetStoryEffect,
      DeleteStoryEffect,
      CreateStoryEffect,
      UpdateStoryEffect,
    ]),
  ],
  providers: [StoryService],
})
export class StoryModule {}
