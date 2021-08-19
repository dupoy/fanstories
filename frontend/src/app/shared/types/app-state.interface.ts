import { IAuthState } from '../../auth/types/auth-state.interface';
import { IStoriesState } from '../modules/stories/types/stories-state.interface';

export interface IAppState {
  auth?: IAuthState
  stories?: IStoriesState
}
