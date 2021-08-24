import { IGetFandomResponse } from './get-fandoms-response.interface';

export interface IFandomsState {
  isLoading: boolean
  backendError: string | null
  data: IGetFandomResponse | null
}
