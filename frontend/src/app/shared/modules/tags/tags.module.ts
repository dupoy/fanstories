import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TagsComponent } from './components/tags/tags.component';
import { TagsService } from './services/tags.service';
import { GetTagsEffect } from './store/effects/get-tags.effect';
import { reducer } from './store/reducers';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('tags', reducer),
    EffectsModule.forFeature([GetTagsEffect]),
  ],
  providers: [TagsService],
  exports: [TagsComponent],
})
export class TagsModule {}
