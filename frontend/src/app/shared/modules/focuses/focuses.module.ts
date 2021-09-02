import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FocusesService } from './services/focuses.service';
import { GetFocusesEffect } from './store/effects/get-focuses.effect';
import { reducer } from './store/reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('focuses', reducer),
    EffectsModule.forFeature([GetFocusesEffect]),
  ],
  providers: [FocusesService],
})
export class FocusesModule {}
