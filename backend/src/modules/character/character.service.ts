import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { ICharacterResponse } from './types/characterResponse.interface';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,

    @InjectRepository(FandomEntity)
    private readonly fandomRepository: Repository<FandomEntity>,
  ) {}

  async createCharacter(
    createCharacterDto: CreateCharacterDto,
    slug: string,
  ): Promise<CharacterEntity> {
    const fandom = await this.fandomRepository.findOne(
      { slug },
      {
        relations: ['characters'],
      },
    );

    if (!fandom) {
      throw new HttpException("Fandom doesn't exist", HttpStatus.NOT_FOUND);
    }

    const condidate = fandom.characters.find(
      (character) => character.name === createCharacterDto.name,
    );

    if (condidate) {
      throw new HttpException(
        'Character already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.characterRepository.save(
      this.characterRepository.create({ ...createCharacterDto, fandom }),
    );
  }

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

  buildResponse(character: CharacterEntity): ICharacterResponse {
    delete character.fandom;
    return { character };
  }
}
