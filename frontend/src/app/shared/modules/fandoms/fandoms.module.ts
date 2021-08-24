import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FandomsComponent } from './components/fandoms/fandoms.component';
import { FandomsService } from './services/fandoms.service';
import { GetFandomEffect } from './store/effects/get-fandom.effect';
import { reducer } from './store/reducers';

const routes: Routes = [{path: 'fandoms', component: FandomsComponent}]

@NgModule({
  declarations: [FandomsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('fandoms', reducer),
    EffectsModule.forFeature([GetFandomEffect]),
    RouterModule.forChild(routes),
  ],
  providers: [FandomsService],
})
export class FandomsModule {}
