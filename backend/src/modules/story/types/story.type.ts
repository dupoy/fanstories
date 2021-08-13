import { StoryEntity } from 'src/entities/story.entity';

export type StoryType = Omit<
  StoryEntity,
  'updateTimestamp' | 'slugifyTitle' | 'countWords'
>;
