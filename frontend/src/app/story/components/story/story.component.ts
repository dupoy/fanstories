import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { ICurrentUser } from 'src/app/shared/types/current-user.interface';
import { IStory } from 'src/app/shared/types/story.interface';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { IChapter } from '../../../shared/types/chapter.interface';
import { deleteStoryAction } from '../../store/actions/delete-story.action';
import { getStoryAction } from '../../store/actions/get-story.action';
import { storySelector } from '../../store/selectors';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit, OnDestroy {
  story!: IStory | null
  storySubscription$!: Subscription

  chapter?: IChapter
  currentChapterIndex!: number

  slug!: string | null
  chapterSlug!: string | null
  isAuthor$!: Observable<boolean>

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchStory()
  }

  ngOnDestroy(): void {
    if (this.storySubscription$) this.storySubscription$.unsubscribe()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.chapterSlug = this.route.snapshot.paramMap.get('chapterSlug')

    this.isAuthor$ = combineLatest(
      this.store.pipe(select(storySelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(([story, currentUser]: [IStory | null, ICurrentUser | null]) => {
        if (!story || !currentUserSelector) return false
        return currentUser?.username === story.author.username
      })
    )
  }

  initializeListeners(): void {
    this.storySubscription$ = this.store
      .pipe(select(storySelector))
      .subscribe((story: IStory | null) => {
        this.story = story
        this.chapter = story?.chapters.find((chapter, idx) => {
          if (chapter.slug === this.chapterSlug) {
            this.currentChapterIndex = idx
            return true
          }
          return false
        })
      })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initializeValues()
        this.initializeListeners()
        this.fetchStory()
      }
    })
  }

  fetchStory(): void {
    if (this.slug) this.store.dispatch(getStoryAction({slug: this.slug}))
  }

  deleteStory(slug: string) {
    if (confirm('Are you sure you want to delete this story?')) {
      this.store.dispatch(deleteStoryAction({slug}))
    }
  }
}
