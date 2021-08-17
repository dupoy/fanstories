import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-backend-errors',
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss'],
})
export class BackendErrorsComponent implements OnInit {
  @Input('errors') errorsProps!: string

  constructor() {}

  ngOnInit(): void {}
}
