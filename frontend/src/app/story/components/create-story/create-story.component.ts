import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { getFandomsAction } from 'src/app/shared/modules/fandoms/store/actions/get-fandoms.action';
import {
    IGetFandomResponse
} from 'src/app/shared/modules/fandoms/types/get-fandoms-response.interface';
import { getFocusesAction } from 'src/app/shared/modules/focuses/store/actions/get-focuses.action';
import {
    IGetFocusesResponse
} from 'src/app/shared/modules/focuses/types/get-focuses-response.interface';
import { getRatingsAction } from 'src/app/shared/modules/ratings/store/actions/get-ratings.action';
import {
    IGetRatingsResponse
} from 'src/app/shared/modules/ratings/types/get-ratings-response.interface';
import { getTagsActions } from 'src/app/shared/modules/tags/store/actions/get-tags.actions';
import { IGetTagsResponse } from 'src/app/shared/modules/tags/types/get-tags-response.interface';
import { ICharacter } from 'src/app/shared/types/character.interface';
import { IFandom } from 'src/app/shared/types/fandom.interface';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { fandomsSelector } from '../../../shared/modules/fandoms/store/selectors';
import { focusesSelector } from '../../../shared/modules/focuses/store/selectors';
import { ratingsSelector } from '../../../shared/modules/ratings/store/selectors';
import { tagsSelector } from '../../../shared/modules/tags/store/selectors';
import { IFocus } from '../../../shared/types/focus.interface';
import { IRating } from '../../../shared/types/rating.interface';
import { ITag } from '../../../shared/types/tag.interface';
import { createStoryAction } from '../../store/actions/create-story.action';
import { IStoryRequest } from '../../types/story-request.interface';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss'],
})
export class CreateStoryComponent implements OnInit {
  form!: FormGroup

  fandoms$!: Observable<IGetFandomResponse | null>
  tags$!: Observable<IGetTagsResponse | null>
  focuses$!: Observable<IGetFocusesResponse | null>
  ratings$!: Observable<IGetRatingsResponse | null>

  dropdownSelectFandomsOrTags!: IDropdownSettings
  dropdownSelectCharacters!: IDropdownSettings
  dropdownSelectFocusesOrRatings!: IDropdownSettings

  characters: ICharacter[] = []

  get titleControl() {
    return this.form.get('title')
  }

  get descriptionControl() {
    return this.form.get('description')
  }

  get fandomsControl() {
    return this.form.get('fandoms')
  }

  get charactersControl() {
    return this.form.get('characters')
  }
  get tagsControl() {
    return this.form.get('tags')
  }

  get focusesControl() {
    return this.form.get('focuses')
  }

  get ratingsControl() {
    return this.form.get('ratings')
  }

  get pairingsControl() {
    return (this.form.get('pairings') as FormArray)?.controls
  }

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
    this.initializeDropdownSettings()
    this.initializeForm()
  }

  fetchData(): void {
    this.store.dispatch(getFandomsAction())
    this.store.dispatch(getTagsActions())
    this.store.dispatch(getFocusesAction())
    this.store.dispatch(getRatingsAction())
  }

  initializeValues(): void {
    this.fandoms$ = this.store.pipe(select(fandomsSelector))
    this.tags$ = this.store.pipe(select(tagsSelector))
    this.focuses$ = this.store.pipe(select(focusesSelector))
    this.ratings$ = this.store.pipe(select(ratingsSelector))
  }

  initializeDropdownSettings(): void {
    const dropdownSelectSettings: IDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      selectAllText: 'Select all',
      unSelectAllText: 'Deselect all',
      allowSearchFilter: true,
    }
    this.dropdownSelectFandomsOrTags = {
      ...dropdownSelectSettings,
      textField: 'title',
    }
    this.dropdownSelectCharacters = {
      ...dropdownSelectSettings,
      textField: 'name',
    }
    this.dropdownSelectFocusesOrRatings = {
      ...dropdownSelectSettings,
      textField: 'value',
      singleSelection: true,
      closeDropDownOnSelection: true,
    }
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.maxLength(510)]),
      fandoms: new FormControl(null, Validators.required),
      characters: new FormControl(null, Validators.required),
      tags: new FormControl(null),
      focuses: new FormControl(null, Validators.required),
      ratings: new FormControl(null, Validators.required),
    })
  }

  onFandomSelect(selectedFandoms: any): void {
    this.characters = []

    selectedFandoms = selectedFandoms?.map((fandom: IFandom) => fandom.title)

    this.fandoms$
      .subscribe((fandoms) =>
        fandoms?.fandoms
          .filter((fandom) => selectedFandoms?.includes(fandom.title))
          .map((fandom) => this.characters.push(...(fandom.characters || [])))
      )
      .unsubscribe()
  }

  addPairing(): void {
    const control = new FormControl(null, Validators.required)

    if (this.form.get('pairings')) {
      ;(this.form.get('pairings') as FormArray).push(control)
    } else {
      const pairingsArray = new FormArray([])
      this.form.addControl('pairings', pairingsArray)
      ;(this.form.get('pairings') as FormArray).push(control)
    }
  }

  onSubmit(): void {
    this.form.disable()
    const story: IStoryRequest = {
      story: {
        title: this.titleControl?.value,
        description: this.descriptionControl?.value,
        fandoms: this.fandomsControl?.value.map(
          (fandom: IFandom) => fandom.title
        ),
        characters: this.charactersControl?.value.map(
          (character: ICharacter) => character.name
        ),
        pairings: this.pairingsControl?.map(
          (pairing: AbstractControl) =>
            `[${pairing.value
              .map((character: ICharacter) => character.name)
              .join('/')}]`
        ),
        tags: this.tagsControl?.value.map((tag: ITag) => tag.title),
        focus: this.focusesControl?.value
          .map((focus: IFocus) => focus.value)
          .join(''),
        rating: this.ratingsControl?.value
          .map((rating: IRating) => rating.value)
          .join(''),
      },
    }

    this.store.dispatch(createStoryAction({story}))
  }
}
