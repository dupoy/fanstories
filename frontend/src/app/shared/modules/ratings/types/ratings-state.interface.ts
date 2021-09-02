import { IGetRatingsResponse } from './get-ratings-response.interface';

export interface IRatingsState {
  isLoading: boolean
  backendErrors: string | null
  ratings: IGetRatingsResponse | null
}
