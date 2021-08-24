import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { getFandomsAction } from '../../store/actions/get-fandoms.action';
import { backendErrorsSelector, fandomsSelector, isLoadingSelector } from '../../store/selectors';
import { IGetFandomResponse } from '../../types/get-fandoms-response.interface';

@Component({
  selector: 'app-fandoms',
  templateUrl: './fandoms.component.html',
  styleUrls: ['./fandoms.component.scss'],
})
export class FandomsComponent implements OnInit {
  isLoading$!: Observable<boolean>
  errors$!: Observable<string | null>
  fandoms$!: Observable<IGetFandomResponse | null>

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.errors$ = this.store.pipe(select(backendErrorsSelector))
    this.fandoms$ = this.store.pipe(select(fandomsSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFandomsAction())
  }
}
