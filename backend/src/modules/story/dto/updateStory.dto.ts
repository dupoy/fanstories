import { EFocus } from 'src/types/focus.enum';

import { ERating } from '../../../types/rating.enum';

export class UpdateStoryDto {
  readonly title?: string;
  readonly description?: string;
  readonly rating?: ERating;
  readonly focus?: EFocus;
  fandoms?: string[];
  readonly characters?: string[];
  readonly pairings?: string[];
  tags?: string[];
  betas?: string[];
}
