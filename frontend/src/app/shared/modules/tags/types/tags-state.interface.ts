import { IGetTagsResponse } from './get-tags-response.interface';

export interface ITagsState {
  isLoading: boolean
  backendErrors: string | null
  data: IGetTagsResponse | null
}
