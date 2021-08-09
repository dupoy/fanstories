import { Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';
import { CreateCharacterDto } from './types/createCharacterDto';
import { UpdateCharacterDto } from './types/updateCharacter.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,

    @InjectRepository(FandomEntity)
    private readonly fandomRepository: Repository<FandomEntity>,
  ) {}

  async createCharacters(
    createCharacterDtos: CreateCharacterDto[],
    fandomId: number,
  ): Promise<CharacterEntity[]> {
    const fandom = await this.fandomRepository.findOne(fandomId);

    if (!fandom) {
      throw new HttpException("Fandom didn't exist", HttpStatus.NOT_FOUND);
    }

    return Promise.all(
      createCharacterDtos.map(async (createCharacterDto) => {
        const condidate = await this.characterRepository.findOne({
          name: createCharacterDto.name,
        });

        if (condidate) {
          throw new HttpException(
            'Character already exist',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        return this.characterRepository.save({ ...createCharacterDto, fandom });
      }),
    );
  }

  async updateCharacters(
    updateCharacterDtos: UpdateCharacterDto[],
    fandomId: number,
  ): Promise<CharacterEntity[]> {
    const fandom = await this.fandomRepository.findOne(fandomId);

    if (!fandom) {
      throw new HttpException("Fandom didn't exist", HttpStatus.NOT_FOUND);
    }

    return await Promise.all(
      updateCharacterDtos.map(async (updateCharacterDto) => {
        const character = await this.characterRepository.findOne(
          updateCharacterDto.id,
        );
        Object.assign(character, updateCharacterDto);
        return await this.characterRepository.save(character);
      }),
    );
  }
}
