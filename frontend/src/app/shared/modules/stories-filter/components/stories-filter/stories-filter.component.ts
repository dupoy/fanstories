import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { Observable } from 'rxjs';
import { ITag } from 'src/app/shared/types/tag.interface';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { ICharacter } from '../../../../types/character.interface';
import { IFandom } from '../../../../types/fandom.interface';
import { IFilters } from '../../../../types/filters.interface';
import { IFocus } from '../../../../types/focus.interface';
import { IRating } from '../../../../types/rating.interface';
import { getFandomsAction } from '../../../fandoms/store/actions/get-fandoms.action';
import { fandomsSelector } from '../../../fandoms/store/selectors';
import { IGetFandomResponse } from '../../../fandoms/types/get-fandoms-response.interface';
import { getFocusesAction } from '../../../focuses/store/actions/get-focuses.action';
import { focusesSelector } from '../../../focuses/store/selectors';
import { IGetFocusesResponse } from '../../../focuses/types/get-focuses-response.interface';
import { getRatingsAction } from '../../../ratings/store/actions/get-ratings.action';
import { ratingsSelector } from '../../../ratings/store/selectors';
import { IGetRatingsResponse } from '../../../ratings/types/get-ratings-response.interface';
import { getTagsActions } from '../../../tags/store/actions/get-tags.actions';
import { tagsSelector } from '../../../tags/store/selectors';
import { IGetTagsResponse } from '../../../tags/types/get-tags-response.interface';

@Component({
  selector: 'app-stories-filter',
  templateUrl: './stories-filter.component.html',
  styleUrls: ['./stories-filter.component.scss'],
})
export class StoriesFilterComponent implements OnInit {
  @Output() onSubmitEvent: EventEmitter<IFilters> = new EventEmitter<IFilters>()
  form!: FormGroup

  fandoms$!: Observable<IGetFandomResponse | null>
  tags$!: Observable<IGetTagsResponse | null>
  focuses$!: Observable<IGetFocusesResponse | null>
  ratings$!: Observable<IGetRatingsResponse | null>

  characters: ICharacter[] = []

  showExcludeFandoms: boolean = false
  showExcludeCharacters: boolean = false
  showExcludeTags: boolean = false

  dropdownSelectFandomsOrTags!: IDropdownSettings
  dropdownSelectCharacters!: IDropdownSettings
  dropdownSelectFocusesOrRatings!: IDropdownSettings

  selectedFandoms = []

  sortBy = [
    {value: 'createdAt', title: 'Create date'},
    {value: 'cupdatedAt', title: 'Update date'},
    {value: 'followCount', title: 'Follows'},
    {value: 'favoriteCount', title: 'Likes'},
    {value: 'viewCount', title: 'Popularity'},
    {value: 'words', title: 'Words'},
    {value: 'pages', title: 'Pages'},
  ]

  orderBy = [
    {value: 'DESC', title: 'Descending'},
    {value: 'ASC', title: 'Ascending'},
  ]

  get pairings() {
    return (this.form.get('pairings') as FormArray)?.controls
  }

  get excludePairings() {
    return (this.form.get('excludePairings') as FormArray)?.controls
  }

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
    this.fetchData()

    this.initializeDropdownSettings()
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
    }
  }

  initializeValues(): void {
    this.fandoms$ = this.store.pipe(select(fandomsSelector))
    this.tags$ = this.store.pipe(select(tagsSelector))
    this.focuses$ = this.store.pipe(select(focusesSelector))
    this.ratings$ = this.store.pipe(select(ratingsSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFandomsAction())
    this.store.dispatch(getTagsActions())
    this.store.dispatch(getFocusesAction())
    this.store.dispatch(getRatingsAction())
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      words: new FormControl(0),
      fandoms: new FormControl(null),
      characters: new FormControl(null),
      tags: new FormControl(null),
      excludeFandoms: new FormControl(null),
      excludeCharacters: new FormControl(null),
      excludeTags: new FormControl(null),
      focuses: new FormControl(null),
      ratings: new FormControl(null),
      sort: new FormControl('createdAt'),
      order: new FormControl('DESC'),
    })
  }

  onSubmit(): void {
    const filters: IFilters = {
      title: this.form.value['title']?.trim(),
      words: this.form.value['words'],
      fandoms: this.form.value['fandoms']
        ?.map((fandom: IFandom) => fandom.title)
        .join(';'),
      characters: this.form.value['characters']
        ?.map((character: ICharacter) => character.name)
        ?.join(';'),
      pairings: this.pairings
        ?.map(
          (pairing) =>
            `[${pairing.value
              .map((character: ICharacter) => character.name)
              .join('/')}]`
        )
        .join(';'),
      tags: this.form.value['tags']?.map((tag: ITag) => tag.title)?.join(';'),
      excludeFandoms: this.showExcludeFandoms
        ? this.form.value['excludeFandoms']
            ?.map((fandom: IFandom) => fandom.title)
            .join(';')
        : null,
      excludeCharacters: this.showExcludeCharacters
        ? this.form.value['excludeCharacters']
            ?.map((character: ICharacter) => character.name)
            ?.join(';')
        : null,
      excludePairings: this.excludePairings
        ?.map(
          (pairing) =>
            `[${pairing.value
              .map((character: ICharacter) => character.name)
              .join('/')}]`
        )
        .join(';'),
      excludeTags: this.showExcludeTags
        ? this.form.value['excludeTags']
            ?.map((tag: ITag) => tag.title)
            ?.join(';')
        : null,
      focuses: this.form.value['focuses']
        ?.map((focus: IFocus) => focus.value)
        ?.join(';'),
      ratings: this.form.value['ratings']
        ?.map((rating: IRating) => rating.value)
        ?.join(';'),
      sort: this.form.value['sort'] || 'createdAt',
      order: this.form.value['order'] || 'DESC',
    }

    this.onSubmitEvent.emit(filters)
  }

  onReset(): void {
    this.characters = []

    if (this.form.get('pairings')) {
      this.form.removeControl('pairings')
    }

    if (this.form.get('excludePairings')) {
      this.form.removeControl('excludePairings')
    }

    this.showExcludeCharacters =
      this.showExcludeFandoms =
      this.showExcludeTags =
        false

    this.form.reset()
    this.onSubmitEvent.emit(this.form.value)
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

  excludePairing(): void {
    const control = new FormControl(null, Validators.required)

    if (this.form.get('excludePairings')) {
      ;(this.form.get('excludePairings') as FormArray).push(control)
    } else {
      const pairingsArray = new FormArray([])
      this.form.addControl('excludePairings', pairingsArray)
      ;(this.form.get('excludePairings') as FormArray).push(control)
    }
  }
}
