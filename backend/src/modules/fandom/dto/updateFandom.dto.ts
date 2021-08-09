import { CreateCharacterDto } from 'src/modules/character/types/createCharacterDto';

import { UpdateCharacterDto } from '../../character/types/updateCharacter.dto';

export class UpdateFandomDto {
  title?: string;
  description?: string;
  readonly characters?: UpdateCharacterDto[];
}
