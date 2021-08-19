import { IGetStoriesResponse } from './get-stories-response.interface';

export interface IStoriesState {
  isLoading: boolean
  error: string | null
  data: IGetStoriesResponse | null
}
