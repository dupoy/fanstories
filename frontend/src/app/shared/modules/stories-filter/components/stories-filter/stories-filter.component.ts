import { Observable } from 'rxjs';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { ICharacter } from '../../../../types/character-interface';
import { IFandom } from '../../../../types/fandom.interface';
import { IFilters } from '../../../../types/filters.interface';
import { getFandomsAction } from '../../../fandoms/store/actions/get-fandoms.action';
import { fandomsSelector } from '../../../fandoms/store/selectors';
import { IGetFandomResponse } from '../../../fandoms/types/get-fandoms-response.interface';
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

  characters: ICharacter[] = []

  showExcludeFandoms: boolean = false
  showExcludeCharacters: boolean = false
  showExcludeTags: boolean = false

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
  }

  initializeValues(): void {
    this.fandoms$ = this.store.pipe(select(fandomsSelector))
    this.tags$ = this.store.pipe(select(tagsSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFandomsAction())
    this.store.dispatch(getTagsActions())
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
    })
  }

  onSubmit() {
    const filters: IFilters = {
      title: this.form.value['title']?.trim(),
      words: this.form.value['words'],
      fandoms: this.form.value['fandoms']
        ?.map((fandom: IFandom) => fandom.title)
        .join(';'),
      characters: this.form.value['characters']?.join(';'),
      pairings: this.form.value['pairings']
        ?.map((pairing: string[]) => `[${pairing.join('/')}]`)
        ?.join(';'),
      tags: this.form.value['tags']?.join(';'),
      excludeFandoms: this.showExcludeFandoms
        ? this.form.value['excludeFandoms']
            ?.map((fandom: IFandom) => fandom.title)
            .join(';')
        : null,
      excludeCharacters: this.showExcludeCharacters
        ? this.form.value['excludeCharacters']?.join(';')
        : null,
      excludePairings: this.form.value['excludePairings']
        ?.map((pairing: string[]) => `[${pairing.join('/')}]`)
        ?.join(';'),
      excludeTags: this.showExcludeTags
        ? this.form.value['excludeTags']?.join(';')
        : null,
    }

    this.onSubmitEvent.emit(filters)
  }

  onReset() {
    this.form.reset()
    this.characters = []
    this.onSubmitEvent.emit(this.form.value)

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
  }

  onFandomSelect() {
    this.characters = []
    this.form.value['fandoms']?.map((fandom: IFandom) =>
      this.characters.push(...fandom.characters)
    )
  }

  addPairing() {
    const control = new FormControl(null, Validators.required)

    if (this.form.get('pairings')) {
      ;(this.form.get('pairings') as FormArray).push(control)
    } else {
      const pairingsArray = new FormArray([])
      this.form.addControl('pairings', pairingsArray)
      ;(this.form.get('pairings') as FormArray).push(control)
    }
  }

  excludePairing() {
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
