import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoriesFilterComponent } from './components/stories-filter/stories-filter.component';

@NgModule({
  declarations: [StoriesFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [StoriesFilterComponent],
})
export class StoriesFilterModule {}
