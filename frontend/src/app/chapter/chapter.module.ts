import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreateChapterComponent } from './components/create-chapter/create-chapter.component';
import { ChapterService } from './services/chapter.service';
import { CreateChapterEffect } from './store/effects/create-chapter.effect';
import { GetChapterEffect } from './store/effects/get-chapter.effect';
import { UpdateChapterEffect } from './store/effects/update-chapter.effect';
import { reducer } from './store/reducers';

const routes: Routes = [
  {
    path: 'stories/:storySlug/chapters/create',
    component: CreateChapterComponent,
    pathMatch: 'full',
  },
  {
    path: 'stories/:storySlug/chapters/:chapterSlug/edit',
    component: CreateChapterComponent,
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [CreateChapterComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('chapter', reducer),
    EffectsModule.forFeature([
      CreateChapterEffect,
      UpdateChapterEffect,
      GetChapterEffect,
    ]),
  ],
  providers: [ChapterService],
})
export class ChapterModule {}
