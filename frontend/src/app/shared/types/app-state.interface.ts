import { IChapterState } from 'src/app/chapter/types/chapter-state.interface';

import { IAuthState } from '../../auth/types/auth-state.interface';
import { IStoryState } from '../../story/types/story-state';
import { IUserProfileState } from '../../user-profile/types/user-profile-state.interface';
import { IFandomsState } from '../modules/fandoms/types/fandoms-state.interface';
import { IFocusesState } from '../modules/focuses/types/focuses-state.interface';
import { IRatingsState } from '../modules/ratings/types/ratings-state.interface';
import { IStoriesState } from '../modules/stories/types/stories-state.interface';
import { ITagsState } from '../modules/tags/types/tags-state.interface';

export interface IAppState {
  auth?: IAuthState
  stories?: IStoriesState
  story?: IStoryState
  userProfile?: IUserProfileState
  fandoms?: IFandomsState
  tags?: ITagsState
  focuses?: IFocusesState
  ratings?: IRatingsState
  chapter?: IChapterState
}
