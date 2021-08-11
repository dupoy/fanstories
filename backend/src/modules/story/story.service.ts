import slugify from 'slugify';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StoryEntity } from '../../entities/story.entity';
import { FandomService } from '../fandom/fandom.service';
import { ProfileService } from '../profile/profile.service';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { CreateStoryDto } from './dto/createStory.dto';
import { UpdateStoryDto } from './dto/updateStory.dto';
import { IStoryResponse } from './types/storyResponse.interface';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly famdomService: FandomService,
    private readonly profileService: ProfileService,
  ) {}

  async createStory(
    createStoryDto: CreateStoryDto,
    currentUserId: number,
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId);

    const slug = slugify(createStoryDto.title);
    const condidate = await this.storyRepository.findOne({ slug });

    if (condidate) {
      throw new HttpException(
        'Story already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const tags = await this.tagService.find(createStoryDto.tags || []);
    const fandoms = (
      await this.famdomService.find({
        titles: createStoryDto.fandoms || [],
      })
    ).fandoms.map((fandom) => {
      delete fandom.characters;
      return fandom;
    });
    const betas = await this.userService.find(createStoryDto.betas || []);

    const story = Object.assign(new StoryEntity(), {
      ...createStoryDto,
      fandoms,
      tags,
      betas,
      author: currentUser,
    });

    return this.storyRepository.save(story);
  }

  async findOneBySlug(slug: string): Promise<StoryEntity> {
    return await this.storyRepository.findOne({ slug });
  }

  async findOneBySlugAndUpdate(
    updateStoryDto: UpdateStoryDto,
    slug: string,
    currentUserId: number,
  ): Promise<StoryEntity> {
    const story = await this.storyRepository.findOne({ slug });

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot edit this story',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tags = await this.tagService.find(updateStoryDto.tags || []);
    const fandoms = (
      await this.famdomService.find({
        titles: updateStoryDto.fandoms || [],
      })
    ).fandoms.map((fandom) => {
      delete fandom.characters;
      return fandom;
    });
    const betas = await this.userService.find(updateStoryDto.betas || []);

    if (tags.length > 0) {
      Object.assign(story, { tags });
      delete updateStoryDto.tags;
    }

    if (fandoms.length > 0) {
      Object.assign(story, { fandoms });
      delete updateStoryDto.fandoms;
    }

    if (betas.length > 0) {
      Object.assign(story, { betas });
      delete updateStoryDto.betas;
    }

    return this.storyRepository.save(Object.assign(story, updateStoryDto));
  }

  async buildResponse(
    story: StoryEntity,
    currentUserId: number,
  ): Promise<IStoryResponse> {
    const profile = await this.profileService.findOneByUsername(
      story.author.username,
      currentUserId,
    );

    const currentUser = await this.userService.findOneById(currentUserId);

    const isFavorite = currentUser.followStories
      .map((story) => story.title)
      .includes(story.title);
    const isFollow = currentUser.favoriteStories
      .map((story) => story.title)
      .includes(story.title);

    return {
      story: {
        ...story,
        author: this.profileService.buildResponse(profile),
        favorite: isFavorite,
        follow: isFollow,
      },
    };
  }
}
