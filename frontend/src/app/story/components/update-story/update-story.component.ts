import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getFandomsAction } from 'src/app/shared/modules/fandoms/store/actions/get-fandoms.action';
import { fandomsSelector } from 'src/app/shared/modules/fandoms/store/selectors';
import {
    IGetFandomResponse
} from 'src/app/shared/modules/fandoms/types/get-fandoms-response.interface';
import { getFocusesAction } from 'src/app/shared/modules/focuses/store/actions/get-focuses.action';
import { focusesSelector } from 'src/app/shared/modules/focuses/store/selectors';
import {
    IGetFocusesResponse
} from 'src/app/shared/modules/focuses/types/get-focuses-response.interface';
import { getRatingsAction } from 'src/app/shared/modules/ratings/store/actions/get-ratings.action';
import { ratingsSelector } from 'src/app/shared/modules/ratings/store/selectors';
import {
    IGetRatingsResponse
} from 'src/app/shared/modules/ratings/types/get-ratings-response.interface';
import { getTagsActions } from 'src/app/shared/modules/tags/store/actions/get-tags.actions';
import { tagsSelector } from 'src/app/shared/modules/tags/store/selectors';
import { IGetTagsResponse } from 'src/app/shared/modules/tags/types/get-tags-response.interface';
import { ICharacter } from 'src/app/shared/types/character.interface';
import { IFandom } from 'src/app/shared/types/fandom.interface';
import { IFocus } from 'src/app/shared/types/focus.interface';
import { IRating } from 'src/app/shared/types/rating.interface';
import { IStory } from 'src/app/shared/types/story.interface';
import { ITag } from 'src/app/shared/types/tag.interface';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { UtilsService } from '../../../shared/services/utils.service';
import { getStoryAction } from '../../store/actions/get-story.action';
import { storySelector } from '../../store/selectors';
import { IStoryRequest } from '../../types/story-request.interface';

@Component({
  selector: 'app-update-story',
  templateUrl: './update-story.component.html',
  styleUrls: ['./update-story.component.scss'],
})
export class UpdateStoryComponent implements OnInit, OnDestroy {
  story!: IStory
  storySubscription!: Subscription

  fandoms$!: Observable<IGetFandomResponse | null>
  tags$!: Observable<IGetTagsResponse | null>
  focuses$!: Observable<IGetFocusesResponse | null>
  ratings$!: Observable<IGetRatingsResponse | null>

  dropdownSelectFandomsOrTags!: IDropdownSettings
  dropdownSelectCharacters!: IDropdownSettings
  dropdownSelectFocusesOrRatings!: IDropdownSettings

  characters: ICharacter[] = []

  selectedFandoms = {}
  selectedCharacters = {}
  selectedTags = {}
  selectedFocus = {}
  selectedRating = {}
  selectedPairings!: [{id: string; name: string}[]]

  slug!: string | null

  form!: FormGroup

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

  get statusControl() {
    return this.form.get('status')
  }

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.initializeDropdownSettings()
    this.initialValues()
    this.initializeForm()
    this.fetchData()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    if (this.storySubscription) this.storySubscription.unsubscribe()
  }

  fetchData() {
    this.store.dispatch(getFandomsAction())
    this.store.dispatch(getTagsActions())
    this.store.dispatch(getFocusesAction())
    this.store.dispatch(getRatingsAction())

    if (this.slug) {
      this.store.dispatch(getStoryAction({slug: this.slug}))
    }
  }

  initialValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.fandoms$ = this.store.pipe(select(fandomsSelector))
    this.tags$ = this.store.pipe(select(tagsSelector))
    this.focuses$ = this.store.pipe(select(focusesSelector))
    this.ratings$ = this.store.pipe(select(ratingsSelector))
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
      status: new FormControl(null, Validators.required),
    })
  }

  initializeListeners(): void {
    if (this.slug) {
      this.storySubscription = this.store
        .pipe(select(storySelector), filter(this.utilsService.isNotNull))
        .subscribe((story: IStory) => {
          this.story = story
          this.patchForm()
        })
    }
  }

  patchForm(): void {
    this.titleControl?.patchValue(this.story.title)
    this.descriptionControl?.patchValue(this.story.description)
    this.selectedFandoms = this.story.fandoms
    const selectedCharacters: ICharacter[] = []
    this.fandoms$
      .subscribe((fandoms) =>
        fandoms?.fandoms
          .filter((fandom) =>
            fandom.characters.map((character) =>
              this.story.characters.includes(character.name)
            )
          )
          .map((fandom) => fandom.characters)
          .forEach((characters) => selectedCharacters.push(...characters))
      )
      .unsubscribe()
    this.selectedCharacters = selectedCharacters
    this.story.pairings.forEach((pairing) => this.initializePairings(pairing))
    this.selectedTags = this.story.tags
    this.selectedFocus = [{...this.story.focus}]
    this.selectedRating = [{...this.story.rating}]
    this.statusControl?.patchValue(this.story.status)
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

  initializePairings(pairing: string): void {
    this.addPairing()
    if (pairing) {
      const names = pairing.slice(1, -1).split('/')

      if (Array.isArray(this.selectedCharacters)) {
        const characters = this.selectedCharacters.filter((character) =>
          names.includes(character.name)
        )
        if (characters.length) {
          if (this.selectedPairings) {
            this.selectedPairings.push(characters)
          } else {
            this.selectedPairings = [characters]
          }
        }
      }
    }
  }

  onFandomSelect(selectedFandoms: any): void {
    this.characters = []

    if (Array.isArray(selectedFandoms)) {
      selectedFandoms = selectedFandoms?.map((fandom: IFandom) => fandom.title)
      this.fandoms$
        .subscribe((fandoms) =>
          fandoms?.fandoms
            .filter((fandom) => selectedFandoms?.includes(fandom.title))
            .map((fandom) => this.characters.push(...(fandom.characters || [])))
        )
        .unsubscribe()
    }
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
        status: this.statusControl?.value,
      },
    }

    console.log(story)

    // if (this.slug) {
    //   this.store.dispatch(updateStoryAction({slug: this.slug, story}))
    // }
  }
}
