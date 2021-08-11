import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,

    @InjectRepository(FandomEntity)
    private readonly fandomRepository: Repository<FandomEntity>,
  ) {}

  async createCharacters(names: string[], fandomId: number) {
    const fandom = await this.fandomRepository.findOne(fandomId, {
      relations: ['characters'],
    });

    const fandomCharacters = fandom.characters.map(
      (character) => character.name,
    );

    names.forEach(
      async (name) =>
        fandomCharacters.includes(name) ||
        (await this.characterRepository.save({ name, fandom })),
    );
  }

  async deleteCharacter(character: CharacterEntity) {
    await this.characterRepository.delete(character);
  }
}
