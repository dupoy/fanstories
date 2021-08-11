import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TagEntity } from '../../entities/tag.entity';
import { CreateTagDto } from './dto/createTag.dto';
import { ITagResponse } from './types/tagResponse.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
    const tag = this.tagRepository.create(createTagDto);
    const condidate = await this.tagRepository.findOne({ title: tag.title });

    if (condidate) {
      throw new HttpException(
        'Title already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.tagRepository.save(tag);
  }

  buildResponse(tag: TagEntity): ITagResponse {
    return { tag };
  }
}
