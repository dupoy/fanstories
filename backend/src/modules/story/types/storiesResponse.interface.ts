

import { ProfileType } from '../../profile/types/profile.type';
import { StoryType } from './story.type';

export interface IStoriesResponse {
  stories: (Omit<StoryType, 'author'> & {
    follow: boolean;
    favorite: boolean;
    author: ProfileType;
  })[];
  storyCount: number;
}
