import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesModule } from '../shared/modules/stories/stories.module';
import { AllStoriesComponent } from './components/all-stories/all-stories.component';

const routes: Routes = [{path: '', component: AllStoriesComponent}]

@NgModule({
  declarations: [AllStoriesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), StoriesModule],
})
export class AllStoriesModule {}
