import { ICharacter } from './character.interface';

export interface IFandom {
  id: number
  slug: string
  title: string
  description: string
  characters: ICharacter[]
}
