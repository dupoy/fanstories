import { IGetFocusesResponse } from './get-focuses-response.interface';

export interface IFocusesState {
  isLoading: boolean
  backendErrors: string | null
  focuses: IGetFocusesResponse | null
}
