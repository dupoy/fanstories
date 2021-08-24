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

  get pairings() {
    return (this.form.get('pairings') as FormArray).controls
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
      pairings: new FormArray([]),
      tags: new FormControl(null),
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
        ?.map((pairing: string[]) => pairing.join('/'))
        ?.map((pairing: string) => `[${pairing}]`)
        ?.join(';'),
      tags: this.form.value['tags']?.join(';'),
    }

    console.log(filters)

    this.onSubmitEvent.emit(filters)
  }

  onReset() {
    this.form.reset()
    this.characters = []
    this.onSubmitEvent.emit(this.form.value)
  }

  onFandomSelect() {
    this.characters = []
    this.form.value['fandoms']?.map((fandom: IFandom) =>
      this.characters.push(...fandom.characters)
    )
  }

  addPairing() {
    const control = new FormControl(null, Validators.required)
    ;(this.form.get('pairings') as FormArray).push(control)
  }
}
