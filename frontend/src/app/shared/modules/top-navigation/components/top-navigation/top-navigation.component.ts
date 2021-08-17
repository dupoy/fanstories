import { Observable } from 'rxjs';
import { isAnonymousSelector } from 'src/app/auth/store/selectors';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { logoutAction } from '../../../../../auth/store/action/sync.action';
import { currentUserSelector, isLoggedInSelector } from '../../../../../auth/store/selectors';
import { ICurrentUser } from '../../../../types/current-user.interface';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean | null>
  currentUser$!: Observable<ICurrentUser | null>

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  logout() {
    this.store.dispatch(logoutAction())
  }
}
