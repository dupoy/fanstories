

import { IProfileResponse } from '../../profile/types/profileResponse.interface';
import { StoryType } from './story.type';

export interface IStoryResponse {
  story: Omit<StoryType, 'author'> & {
    follow: boolean;
    favorite: boolean;
    author: IProfileResponse;
  };
}
