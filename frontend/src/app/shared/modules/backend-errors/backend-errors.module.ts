import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BackendErrorsComponent } from './components/backend-errors/backend-errors.component';

@NgModule({
  declarations: [BackendErrorsComponent],
  imports: [CommonModule],
  exports: [BackendErrorsComponent],
})
export class BackendErrorsModule {}
