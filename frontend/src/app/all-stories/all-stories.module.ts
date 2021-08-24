import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesFilterModule } from '../shared/modules/stories-filter/stories-filter.module';
import { StoriesModule } from '../shared/modules/stories/stories.module';
import { AllStoriesComponent } from './components/all-stories/all-stories.component';

const routes: Routes = [
  {path: '', redirectTo: 'stories', pathMatch: 'full'},
  {path: 'stories', component: AllStoriesComponent},
]

@NgModule({
  declarations: [AllStoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoriesModule,
    StoriesFilterModule,
  ],
})
export class AllStoriesModule {}
