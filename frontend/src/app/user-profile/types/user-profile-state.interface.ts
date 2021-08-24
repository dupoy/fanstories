import { IProfile } from '../../shared/types/profile.interface';

export interface IUserProfileState {
  isLoading: boolean
  backendError: string | null
  data: IProfile | null
}
