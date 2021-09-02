import { IChapter } from 'src/app/shared/types/chapter.interface';

export interface IChapterState {
  isLoading: boolean
  backendError: string | null
  chapter: IChapter | null
}
