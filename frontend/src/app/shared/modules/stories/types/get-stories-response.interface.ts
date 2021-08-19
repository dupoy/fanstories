import { IStory } from '../../../types/story.interface';

export interface IGetStoriesResponse {
  stories: IStory[]
  storiesCount: number
}
