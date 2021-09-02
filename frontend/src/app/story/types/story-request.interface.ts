import { StoryStatusType } from './story-status.type';

export interface IStoryRequest {
  story: {
    title: string
    description?: string
    fandoms: string[]
    characters: string[]
    pairings?: string[]
    tags?: string[]
    focus: string
    rating: string
    status?: StoryStatusType
  }
}
