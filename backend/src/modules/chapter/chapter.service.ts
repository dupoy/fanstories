import slugify from 'slugify';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChapterEntity } from '../../entities/chapter.entity';
import { StoryEntity } from '../../entities/story.entity';
import { CreateChapterDto } from './dto/createChapter.dto';
import { IChapterResponse } from './types/chapterResponse.interface';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(ChapterEntity)
    private readonly chapterRepository: Repository<ChapterEntity>,
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
  ) {}

  async createChapter(
    createChapterDto: CreateChapterDto,
    slug: string,
    currentUserId: number,
  ): Promise<ChapterEntity> {
    const story = await this.storyRepository.findOne(
      { slug },
      { relations: ['chapters'] },
    );

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot add chapter to this story',
        HttpStatus.BAD_REQUEST,
      );
    }

    const chapterSlug = slugify(createChapterDto.title);
    const condidate = story.chapters.find(
      (chapter) => chapter.slug === chapterSlug,
    );

    if (condidate) {
      throw new HttpException(
        'Chapter with this title in this story already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const chapter = this.chapterRepository.save(
      this.chapterRepository.create({
        ...createChapterDto,
        story,
      }),
    );

    story.countWords();
    this.storyRepository.save(story);

    return chapter;
  }

  buildResponse(chapter: ChapterEntity): IChapterResponse {
    delete chapter.story;
    return { chapter };
  }
}
