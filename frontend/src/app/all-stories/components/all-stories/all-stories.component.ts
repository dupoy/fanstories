import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IFilters } from '../../../shared/types/filters.interface';

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.scss'],
})
export class AllStoriesComponent implements OnInit {
  apiUrl: string = '/stories'
  filters: IFilters = {} as IFilters

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  onSubmit(filters: IFilters): void {
    this.router.navigate(['/stories'], {queryParams: filters})
  }
}
