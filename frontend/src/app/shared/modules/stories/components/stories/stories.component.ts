import { Observable } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { getStoriesAction } from '../../store/actions/get-stories.action';
import { errorSelector, isLoadingSelector, storiesSelector } from '../../store/selectors';
import { IGetStoriesResponse } from '../../types/get-stories-response.interface';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  @Input('apiUrl') apiUrlProps!: string

  isLoading$!: Observable<boolean>
  error$!: Observable<string | null>
  stories$!: Observable<IGetStoriesResponse | null>

  constructor(private readonly store: Store, protected route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchStories()
  }

  fetchStories(): void {
    this.store.dispatch(getStoriesAction({url: this.apiUrlProps}))
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.stories$ = this.store.pipe(select(storiesSelector))
  }

  initializeListeners(): void {}
}
