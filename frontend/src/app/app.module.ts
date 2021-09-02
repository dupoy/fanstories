import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { environment } from 'src/environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AllStoriesModule } from './all-stories/all-stories.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ChapterModule } from './chapter/chapter.module';
import { FandomsModule } from './shared/modules/fandoms/fandoms.module';
import { FocusesModule } from './shared/modules/focuses/focuses.module';
import { RatingsModule } from './shared/modules/ratings/ratings.module';
import { TagsModule } from './shared/modules/tags/tags.module';
import { TopNavigationModule } from './shared/modules/top-navigation/top-navigation.module';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { StoryModule } from './story/story.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AllStoriesModule,
    TopNavigationModule,
    UserProfileModule,
    FandomsModule,
    TagsModule,
    FocusesModule,
    RatingsModule,
    ChapterModule,
    StoryModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NgbModule,
  ],
  providers: [
    PersistenceService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
