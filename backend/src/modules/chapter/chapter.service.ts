import slugify from 'slugify';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChapterEntity } from '../../entities/chapter.entity';
import { StoryEntity } from '../../entities/story.entity';
import { IMessage } from '../../types/message.interface';
import { CreateChapterDto } from './dto/createChapter.dto';
import { UpdateChapterDto } from './dto/updateChapter.dto';
import { IChapterResponse } from './types/chapterResponse.interface';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(ChapterEntity)
    private readonly chapterRepository: Repository<ChapterEntity>,
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>
  ) {}

  async createChapter(
    createChapterDto: CreateChapterDto,
    slug: string,
    currentUserId: number
  ): Promise<ChapterEntity> {
    const story = await this.storyRepository.findOne(
      {slug},
      {relations: ['chapters']}
    )

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_IMPLEMENTED)
    }

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot add chapter to this story',
        HttpStatus.BAD_REQUEST
      )
    }

    const chapterSlug = slugify(createChapterDto.title)
    const condidate = story.chapters.find(
      (chapter) => chapter.slug === chapterSlug
    )

    if (condidate) {
      throw new HttpException(
        'Chapter with this title in this story already exist',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    const chapter = await this.chapterRepository.save(
      Object.assign(new ChapterEntity(), createChapterDto)
    )

    story.chapters.push(chapter)
    story.words = story.countWords()
    story.pages = Math.ceil(story.words / 400)
    await this.storyRepository.save(story)

    return chapter
  }

  async getChapter(
    slug: string,
    chapterSlug: string,
    currentUserId: number
  ): Promise<ChapterEntity> {
    const story = await this.storyRepository.findOne(
      {slug},
      {relations: ['chapters']}
    )

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_IMPLEMENTED)
    }

    const chapter = story.chapters.find(
      (chapter) => chapter.slug === chapterSlug
    )

    if (!chapter) {
      throw new HttpException("Chapter didn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id !== currentUserId) {
      chapter.increaseViews()
      await this.chapterRepository.save(chapter)
      story.countViews()
      await this.storyRepository.save(story)
    }

    return chapter
  }

  async updateChapter(
    updateChapterDto: UpdateChapterDto,
    slug: string,
    currentUserId: number,
    chapterSlug: string
  ): Promise<ChapterEntity> {
    const story = await this.storyRepository.findOne(
      {slug},
      {relations: ['chapters']}
    )

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_IMPLEMENTED)
    }

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot add chapter to this story',
        HttpStatus.BAD_REQUEST
      )
    }

    const condidate = story.chapters.find(
      (chapter) => chapter.slug === chapterSlug
    )

    if (!condidate) {
      throw new HttpException("Chapter didn't exist", HttpStatus.NOT_FOUND)
    }

    const ifExist = story.chapters.find(
      (chapter) =>
        chapter.title === updateChapterDto.title && chapter.id !== condidate.id
    )

    if (ifExist) {
      throw new HttpException(
        'Chapter with this title in this story already exist',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    const chapter = await this.chapterRepository.save(
      Object.assign(condidate, updateChapterDto)
    )

    story.words = story.countWords()
    story.pages = Math.ceil(story.words / 400)
    await this.storyRepository.save(story)

    return chapter
  }

  async deleteChapter(
    chapterSlug: string,
    slug: string,
    currentUserId: number
  ): Promise<IMessage> {
    const story = await this.storyRepository.findOne(
      {slug},
      {relations: ['chapters']}
    )

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_IMPLEMENTED)
    }

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot delete chapter from this story',
        HttpStatus.BAD_REQUEST
      )
    }

    const chapter = story.chapters.find(
      (chapter) => chapter.slug === chapterSlug
    )

    if (!chapter) {
      throw new HttpException("Chapter doesn't exist", HttpStatus.NOT_FOUND)
    }

    story.chapters = story.chapters.filter(({id}) => id !== chapter.id)
    story.words = story.countWords()
    story.pages = Math.ceil(story.words / 400)
    await this.storyRepository.save(story)

    return {success: 'Successfully delete chapter'}
  }

  buildResponse(chapter: ChapterEntity): IChapterResponse {
    delete chapter.story
    return {chapter}
  }
}
