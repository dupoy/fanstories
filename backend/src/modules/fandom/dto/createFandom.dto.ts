import { CreateCharacterDto } from 'src/modules/character/types/createCharacterDto';

export class CreateFandomDto {
  readonly title: string;
  readonly description: string;
  readonly characters: CreateCharacterDto[];
}
