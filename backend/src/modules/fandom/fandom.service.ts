import slugify from 'slugify';
import { DeleteResult, In, MoreThan, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FandomEntity } from '../../entities/fandom.entity';
import { CharacterService } from '../character/character.service';
import { CreateFandomDto } from './dto/createFandom.dto';
import { IFandomResponse } from './types/fandomResponse.interface';
import { IFandomsResponse } from './types/fandomsResponse.interface';
import { QueryParams } from './types/queryParams.interface';

@Injectable()
export class FandomService {
  constructor(
    @InjectRepository(FandomEntity)
    private readonly fandomRepository: Repository<FandomEntity>,
    private readonly characterService: CharacterService,
  ) {}

  async createFandom(createFandomDto: CreateFandomDto): Promise<FandomEntity> {
    const slug = slugify(createFandomDto.title);
    const condidate = await this.fandomRepository.findOne({ slug });

    if (condidate) {
      throw new HttpException(
        'Fandom already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fandom = await this.fandomRepository.save(
      Object.assign(new FandomEntity(), createFandomDto),
    );

    this.characterService.createCharacters(
      createFandomDto.characters,
      fandom.id,
    );

    return fandom;
  }

  async findOneBySlug(slug: string): Promise<FandomEntity> {
    const fandom = await this.fandomRepository.findOne({ slug });

    if (!fandom) {
      throw new HttpException("Fandom didn't exist", HttpStatus.NOT_FOUND);
    }

    return fandom;
  }

  async find(queryParams?: QueryParams): Promise<IFandomsResponse> {
    const fandoms = await this.fandomRepository.find({
      relations: ['characters'],
      where: {
        title: queryParams.titles ? In(queryParams.titles) : MoreThan(0),
      },
    });

    return { fandoms: fandoms, fandomCount: fandoms.length };
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
      await this.characterService.deleteCharacter(character);
    });

    return this.fandomRepository.delete({ slug });
  }

  buildResponse(fandom: FandomEntity): IFandomResponse {
    return { fandom };
  }
}
