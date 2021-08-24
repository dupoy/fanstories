import { parseUrl, stringify } from 'query-string';
import { Observable } from 'rxjs';
import { IFilters } from 'src/app/shared/types/filters.interface';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { getStoriesAction } from '../../store/actions/get-stories.action';
import { errorSelector, isLoadingSelector, storiesSelector } from '../../store/selectors';
import { IGetStoriesResponse } from '../../types/get-stories-response.interface';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit, OnChanges {
  @Input('apiUrl') apiUrlProps!: string

  isLoading$!: Observable<boolean>
  error$!: Observable<string | null>
  stories$!: Observable<IGetStoriesResponse | null>

  filters: IFilters = {} as IFilters

  constructor(
    private readonly store: Store,
    protected route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue

    if (!isApiUrlChanged) {
      this.fetchStories()
    }
  }

  fetchStories(): void {
    const parsedUrl = parseUrl(this.apiUrlProps)
    const stringifiedParams = stringify({
      ...this.filters,
      ...parsedUrl.query,
    })

    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`

    this.store.dispatch(getStoriesAction({url: apiUrlWithParams}))
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.stories$ = this.store.pipe(select(storiesSelector))
  }

  initializeListeners(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.filters = params as IFilters
      this.fetchStories()
    })
  }
}
