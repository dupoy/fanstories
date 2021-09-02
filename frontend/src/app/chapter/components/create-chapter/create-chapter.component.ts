import { Subscription } from 'rxjs';
import { IChapter } from 'src/app/shared/types/chapter.interface';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { select, Store } from '@ngrx/store';

import { createChapterAction } from '../../store/actions/create-chapter.action';
import { getChapterAction } from '../../store/actions/get-chapter.action';
import { updateChapterAction } from '../../store/actions/update-chapter.action';
import { chapterSelector } from '../../store/selectors';
import { IChapterRequest } from '../../types/chapter-request.interface';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss'],
})
export class CreateChapterComponent implements OnInit, OnDestroy {
  form!: FormGroup

  get titleControl() {
    return this.form?.get('title')
  }

  get bodyControl() {
    return this.form?.get('body')
  }

  slug!: string
  chapterSlug!: string

  chapter!: IChapter | null
  chapterSubscription!: Subscription

  editorConfig: AngularEditorConfig = {}

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.initializeForm()
  }

  ngOnDestroy(): void {
    if (this.chapterSubscription) this.chapterSubscription.unsubscribe()
  }

  fetchData(): void {
    this.store.dispatch(
      getChapterAction({storySlug: this.slug, chapterSlug: this.chapterSlug})
    )
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('storySlug') || ''
    this.chapterSlug = this.route.snapshot.paramMap.get('chapterSlug') || ''

    if (this.slug && this.chapterSlug) {
      this.fetchData()
    }

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [{class: 'roboto', name: 'Roboto'}],
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
    }
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
    })
  }

  initializeListeners(): void {
    this.chapterSubscription = this.store
      .pipe(select(chapterSelector))
      .subscribe((chapter) => {
        this.chapter = chapter
        this.patchForm()
      })
  }

  patchForm(): void {
    this.titleControl?.patchValue(this.chapter?.title)
    this.bodyControl?.patchValue(this.chapter?.body)
  }

  onSubmit(): void {
    this.form.disable()
    const chapter: IChapterRequest = {
      chapter: {
        title: this.form.value['title'],
        body: this.form.value['body'],
      },
    }
    if (this.chapterSlug)
      this.store.dispatch(
        updateChapterAction({
          storySlug: this.slug,
          chapterSlug: this.chapterSlug,
          chapter,
        })
      )
    else this.store.dispatch(createChapterAction({slug: this.slug, chapter}))
  }
}
