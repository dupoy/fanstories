import { EFocus } from 'src/types/focus.enum';

import { ERating } from '../../../types/rating.enum';

export class CreateStoryDto {
  readonly title: string;
  readonly description: string;
  readonly rating: ERating;
  readonly focus: EFocus;
  readonly fandoms: string[];
  readonly characters: string[];
  readonly pairings: string[];
  readonly tags: string[];
  readonly betas: string[];
}
