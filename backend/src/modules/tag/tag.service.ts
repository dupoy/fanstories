import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TagEntity } from '../../entities/tag.entity';
import { CreateTagDto } from './dto/createTag.dto';
import { ITagResponse } from './types/tagResponse.interface';
import { ITagsResponse } from './types/tagsResponse.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<TagEntity> {
    const tag = this.tagRepository.create(createTagDto)
    const condidate = await this.tagRepository.findOne({title: tag.title})

    if (condidate) {
      throw new HttpException(
        'Title already exist',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    return this.tagRepository.save(tag)
  }

  async find(tags?: string[]): Promise<TagEntity[]> {
    return tags
      ? this.tagRepository.find({title: In(tags)})
      : this.tagRepository.find()
  }

  buildResponse(tag: TagEntity): ITagResponse {
    return {tag}
  }

  buildTagsResponse(tags: TagEntity[]): ITagsResponse {
    return {tags: tags, tagCount: tags.length}
  }
}
