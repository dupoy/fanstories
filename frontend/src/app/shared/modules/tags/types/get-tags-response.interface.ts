import { ITag } from '../../../types/tag.interface';

export interface IGetTagsResponse {
  tags: ITag[]
  tagCount: number
}
