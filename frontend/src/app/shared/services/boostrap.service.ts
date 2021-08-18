import { ElementRef } from '@angular/core';

declare var bootstrap: any

export interface BootstrapInstance {
  toggle(): void
  hide(): void
}

export class BoostrapService {
  constructor() {}

  static initializeCanvas(ref: ElementRef) {
    return new bootstrap.Offcanvas(ref.nativeElement)
  }
}
