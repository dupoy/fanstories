import { ProfileType } from 'src/modules/profile/types/profile.type';

import { StoryType } from './story.type';

export interface IStoryResponse {
  story: Omit<StoryType, 'author'> & {
    follow: boolean;
    favorite: boolean;
    author: ProfileType;
  };
}
