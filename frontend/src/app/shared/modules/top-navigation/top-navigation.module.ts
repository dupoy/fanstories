import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';

@NgModule({
  declarations: [TopNavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopNavigationComponent],
})
export class TopNavigationModule {}
