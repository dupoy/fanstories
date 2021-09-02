import { StoryStatusType } from '../../story/types/story-status.type';
import { IChapter } from './chapter.interface';
import { IFandom } from './fandom.interface';
import { IFocus } from './focus.interface';
import { IProfile } from './profile.interface';
import { IRating } from './rating.interface';
import { ITag } from './tag.interface';

export interface IStory {
  id: number
  slug: string
  title: string
  description: string
  words: number
  pages: number
  status: StoryStatusType
  favoriteCount: number
  followCount: number
  viewCount: number
  isPublished: boolean
  tags: ITag[]
  fandoms: IFandom[]
  characters: string[]
  pairings: string[]
  createdAt: Date
  updatedAt: Date
  rating: IRating
  focus: IFocus
  author: IProfile
  chapters: IChapter[]
  favorite: boolean
  follow: boolean
}
