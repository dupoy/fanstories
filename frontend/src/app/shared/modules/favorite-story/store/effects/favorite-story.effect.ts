import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IStory } from 'src/app/shared/types/story.interface';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PersistenceService } from '../../../../services/persistence.service';
import { FavoriteStoryService } from '../../services/favorite-story.service';
import {
    favoriteStoryAction, favoriteStoryFailureAction, favoriteStorySuccessAction
} from '../actions/favorite-story.action';

@Injectable()
export class FavoriteStoryEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly favoriteStoryService: FavoriteStoryService,
    private readonly router: Router,
    private readonly persistenceService: PersistenceService
  ) {}

  favoriteStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteStoryAction),
      switchMap(({isFavorite, slug}) => {
        const story$ = isFavorite
          ? this.favoriteStoryService.unfavoriteStory(slug)
          : this.favoriteStoryService.favoriteStory(slug)

        return story$.pipe(
          map(
            (story: IStory) => favoriteStorySuccessAction({story}),
            catchError(() => of(favoriteStoryFailureAction()))
          )
        )
      })
    )
  )

  checkAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(favoriteStoryAction),
        tap(() => {
          const token = this.persistenceService.get('accessToken')
          token || this.router.navigate(['login'])
        })
      ),
    {dispatch: false}
  )
}
