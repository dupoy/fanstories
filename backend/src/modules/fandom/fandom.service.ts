import { CharacterEntity } from 'src/entities/character.entity';
import { createQueryBuilder, DeleteResult, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FandomEntity } from '../../entities/fandom.entity';
import { CharacterService } from '../character/character.service';
import { CreateFandomDto } from './dto/createFandom.dto';
import { UpdateFandomDto } from './dto/updateFandom.dto';
import { IFandomResponse } from './types/fandomResponse.interface';
import { IFandomsResponse } from './types/fandomsResponse.interface';

@Injectable()
export class FandomService {
  constructor(
    @InjectRepository(FandomEntity)
    private readonly fandomRepository: Repository<FandomEntity>,
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    private readonly characterService: CharacterService,
  ) {}

  async createFandom(createFandomDto: CreateFandomDto): Promise<FandomEntity> {
    const condidate = await this.fandomRepository.findOne({
      title: createFandomDto.title,
    });

    if (condidate) {
      throw new HttpException(
        'Fandom already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fandom = new FandomEntity();
    Object.assign(fandom, createFandomDto);
    await this.fandomRepository.save(fandom);

    const characterDtos = createFandomDto.characters;

    fandom.characters = (
      await this.characterService.createCharacters(characterDtos, fandom.id)
    ).map((character) => {
      delete character.fandom;
      delete character.id;
      return character;
    });

    return fandom;
  }

  async findOneBySlug(slug: string): Promise<FandomEntity> {
    const fandom = await this.fandomRepository.findOne({ slug });

    if (!fandom) {
      throw new HttpException("Fandom didn't exist", HttpStatus.NOT_FOUND);
    }

    return fandom;
  }

  async find(): Promise<IFandomsResponse> {
    const queryBuilder = createQueryBuilder(
      FandomEntity,
      'fandom',
    ).leftJoinAndSelect('fandom.characters', 'characters');

    const fandomCount = await queryBuilder.getCount();
    const fandoms = await queryBuilder.getMany();

    return { fandoms: fandoms, fandomCount };
  }

  async findOneAndUpdate(
    slug: string,
    updateFandomDto: UpdateFandomDto,
  ): Promise<FandomEntity> {
    const condidate = await this.fandomRepository.findOne({ slug });

    if (!condidate) {
      throw new HttpException("Fandom didn't exist", HttpStatus.NOT_FOUND);
    }

    const fandom = await this.fandomRepository.findOne({
      title: updateFandomDto.title,
    });

    if (fandom && fandom.id !== condidate.id) {
      throw new HttpException(
        'Fandom with this title already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Object.assign(condidate, updateFandomDto);
    await this.fandomRepository.save(fandom);
    const characterDtos = updateFandomDto.characters;
    await this.characterService.updateCharacters(characterDtos, condidate.id);
    return condidate;
  }

  async findOneAndDelete(slug: string): Promise<DeleteResult> {
    const fandom = await this.fandomRepository.findOne(
      { slug },
      { relations: ['characters'] },
    );

    if (!fandom) {
      throw new HttpException("Fandom doesn't exist", HttpStatus.NOT_FOUND);
    }

    fandom.characters.forEach(async (character) => {
      await this.characterRepository.delete(character);
    });

    return this.fandomRepository.delete({ slug });
  }

  buildResponse(fandom: FandomEntity): IFandomResponse {
    return { fandom };
  }
}
