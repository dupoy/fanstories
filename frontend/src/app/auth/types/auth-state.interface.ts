import { ICurrentUser } from 'src/app/shared/types/current-user.interface';

import { IBackendErrors } from '../../shared/modules/backend-errors/types/backend-errors.interface';

export interface IAuthState {
  isSubmitting: boolean
  currentUser: ICurrentUser | null
  isLoggedIn: boolean | null
  backendErrors: IBackendErrors | null
  isLoading: boolean
}
