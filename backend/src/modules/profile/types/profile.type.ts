import { UserType } from 'src/modules/user/types/user.type';

export type ProfileType = Omit<
  UserType,
  'stories' | 'followAuthors' | 'followStories' | 'favoriteStories'
> & { following: boolean };
