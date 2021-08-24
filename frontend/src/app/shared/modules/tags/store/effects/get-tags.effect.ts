import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TagsService } from '../../services/tags.service';
import { IGetTagsResponse } from '../../types/get-tags-response.interface';
import {
    getTagsActions, getTagsFailureActions, getTagsSuccessActions
} from '../actions/get-tags.actions';

@Injectable()
export class GetTagsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly tagsService: TagsService
  ) {}

  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTagsActions),
      switchMap(() =>
        this.tagsService.getTags().pipe(
          map(
            (tags: IGetTagsResponse) => getTagsSuccessActions({tags}),
            catchError(() => of(getTagsFailureActions()))
          )
        )
      )
    )
  )
}
