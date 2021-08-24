import { IAuthState } from '../../auth/types/auth-state.interface';
import { IUserProfileState } from '../../user-profile/types/user-profile-state.interface';
import { IFandomsState } from '../modules/fandoms/types/fandoms-state.interface';
import { IStoriesState } from '../modules/stories/types/stories-state.interface';
import { ITagsState } from '../modules/tags/types/tags-state.interface';

export interface IAppState {
  auth?: IAuthState
  stories?: IStoriesState
  userProfile?: IUserProfileState
  fandoms?: IFandomsState
  tags?: ITagsState
}
