import { IStory } from '../../shared/types/story.interface';

export interface IStoryState {
  isLoading: boolean
  backendError: string | null
  story: IStory | null
}
