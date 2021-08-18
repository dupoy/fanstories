import { Observable } from 'rxjs';
import { isAnonymousSelector } from 'src/app/auth/store/selectors';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { logoutAction } from '../../../../../auth/store/action/sync.action';
import { currentUserSelector, isLoggedInSelector } from '../../../../../auth/store/selectors';
import { BoostrapService, BootstrapInstance } from '../../../../services/boostrap.service';
import { ICurrentUser } from '../../../../types/current-user.interface';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit, AfterViewInit {
  isLoggedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean | null>
  currentUser$!: Observable<ICurrentUser | null>

  @ViewChild('offcanvas') offcanvasElement!: ElementRef

  offcanvas!: BootstrapInstance

  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngAfterViewInit(): void {
    this.offcanvas = BoostrapService.initializeCanvas(this.offcanvasElement)
  }

  initializeValues() {
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  initializeListeners(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.offcanvas.hide()
      }
    })
  }

  logout() {
    this.store.dispatch(logoutAction())
    this.offcanvas.hide()
  }
}
