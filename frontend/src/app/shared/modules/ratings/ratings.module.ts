import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RatingsService } from './services/ratings.service';
import { GetRatingsEffect } from './store/effects/get-ratings.effect';
import { reducer } from './store/reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ratings', reducer),
    EffectsModule.forFeature([GetRatingsEffect]),
  ],
  providers: [RatingsService],
})
export class RatingsModule {}
