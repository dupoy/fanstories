import { CharacterEntity } from '../../../entities/character.entity';

export type CharacterType = Omit<CharacterEntity, 'fandom'>;
