import slugify from 'slugify';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StoryEntity } from '../../entities/story.entity';
import { UserEntity } from '../../entities/user.entity';
import { FandomService } from '../fandom/fandom.service';
import { ProfileService } from '../profile/profile.service';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils/utils.service';
import { SaveStoryDto } from './dto/saveStory.dto';
import { IFilterQuery } from './types/filterQuery.interface';
import { IStoriesResponse } from './types/storiesResponse.interface';
import { IStoryResponse } from './types/storyResponse.interface';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly famdomService: FandomService,
    private readonly profileService: ProfileService,
    private readonly utilsService: UtilsService,
  ) {}

  async createStory(
    createStoryDto: SaveStoryDto,
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

    const rating = await this.utilsService.findOneByValueRating(
      createStoryDto.rating,
    );

    const focus = await this.utilsService.findOneByValueFocus(
      createStoryDto.focus,
    );

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
      focus,
      rating,
      author: currentUser,
    });

    return this.storyRepository.save(story);
  }

  async findOneBySlug(slug: string): Promise<StoryEntity> {
    return await this.storyRepository.findOne({ slug });
  }

  async findOneBySlugAndUpdate(
    updateStoryDto: SaveStoryDto,
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

    const rating = await this.utilsService.findOneByValueRating(
      updateStoryDto.rating,
    );

    const focus = await this.utilsService.findOneByValueFocus(
      updateStoryDto.focus,
    );

    const tags = await this.tagService.find(updateStoryDto.tags);
    const fandoms = (
      await this.famdomService.find({
        titles: updateStoryDto.fandoms,
      })
    ).fandoms.map((fandom) => {
      return fandom;
    });
    const betas = await this.userService.find(updateStoryDto.betas);

    return this.storyRepository.save(
      Object.assign(story, updateStoryDto, {
        focus,
        rating,
        fandoms,
        betas,
        tags,
      }),
    );
  }

  async find(
    filterQuery: IFilterQuery,
    currentUserId: number,
  ): Promise<IStoriesResponse> {
    const queryBuilder = this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.tags', 'tags')
      .leftJoinAndSelect('story.fandoms', 'fandoms')
      .leftJoinAndSelect('story.author', 'author')
      .leftJoinAndSelect('story.rating', 'rating')
      .leftJoinAndSelect('story.focus', 'focus');

    if (filterQuery.title) {
      const title = filterQuery.title.trim();
      queryBuilder.andWhere('story.title LIKE :title', {
        title: `%${title}%`,
      });
    }

    if (filterQuery.words) {
      const words = +filterQuery.words;
      queryBuilder.andWhere('story.words >= :words', {
        words,
      });
    }

    if (filterQuery.characters) {
      const characters = filterQuery.characters.split(';');
      queryBuilder.andWhere('story.characters IN (:...characters)', {
        characters,
      });
    }

    if (filterQuery.pairings) {
      const pairings = filterQuery.pairings.split(';');
      queryBuilder.andWhere('story.pairings IN (:...pairings)', {
        pairings,
      });
    }

    if (filterQuery.rating) {
      const rating = await this.utilsService.findOneByValueRating(
        filterQuery.rating,
      );
      queryBuilder.andWhere('rating.id = :id', {
        id: rating.id,
      });
    }

    if (filterQuery.focus) {
      const focus = await this.utilsService.findOneByValueFocus(
        filterQuery.focus,
      );
      queryBuilder.andWhere('focus.id = :id', {
        id: focus.id,
      });
    }

    if (filterQuery.fandoms) {
      const fandomIds = (
        await this.famdomService.find({
          titles: filterQuery.fandoms.split(';'),
        })
      ).fandoms.map((fandom) => fandom.id);
      if (fandomIds.length > 0)
        queryBuilder.andWhere('fandoms.id IN (:...fandoms)', {
          fandoms: fandomIds,
        });
    }

    if (filterQuery.tags) {
      const tagIds = (
        await this.tagService.find(filterQuery.tags.split(';'))
      ).map((tag) => tag.id);
      if (tagIds.length > 0)
        queryBuilder.andWhere('tags.id IN (:...tags)', {
          tags: tagIds,
        });
    }

    if (filterQuery.order && filterQuery.sort) {
      queryBuilder.orderBy({
        [filterQuery.sort]: filterQuery.order,
      });
    }

    const storyCount = await queryBuilder.getCount();

    if (filterQuery.limit) {
      queryBuilder.limit(filterQuery.limit);
    }

    if (filterQuery.offset) {
      queryBuilder.offset(filterQuery.offset);
    }

    const stories = await queryBuilder.getMany();

    return {
      stories: await Promise.all(
        stories.map(async (story) => {
          delete story.chapters;
          return (await this.buildResponse(story, currentUserId)).story;
        }),
      ),
      storyCount,
    };
  }

  async followStory(slug: string, currentUserId: number): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId);
    const story = await this.storyRepository.findOne({ slug });

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (story.author.id === currentUserId) {
      throw new HttpException(
        'You cannot follow yours story',
        HttpStatus.BAD_REQUEST,
      );
    }

    const inFollow = await currentUser.followStories
      .map((story) => story.slug)
      .includes(slug);

    if (!inFollow) {
      currentUser.followStories.push(story);
      story.followCount++;
      await this.userRepository.save(currentUser);
    }
    return story;
  }

  async unfollowStory(
    slug: string,
    currentUserId: number,
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId);
    const story = await this.storyRepository.findOne({ slug });

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (story.author.id === currentUserId) {
      throw new HttpException(
        'You cannot unfollow yours story',
        HttpStatus.BAD_REQUEST,
      );
    }

    const idx = currentUser.followStories
      .map((story) => story.slug)
      .indexOf(slug);

    if (idx >= 0) {
      currentUser.followStories.splice(idx, 1);
      story.followCount--;
      await this.userRepository.save(currentUser);
    }

    return story;
  }

  async favoriteStory(
    slug: string,
    currentUserId: number,
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId);
    const story = await this.storyRepository.findOne({ slug });

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND);
    }

    const inFollow = await currentUser.favoriteStories
      .map((story) => story.slug)
      .includes(slug);

    if (!inFollow) {
      currentUser.favoriteStories.push(story);
      story.favoriteCount++;
      await this.userRepository.save(currentUser);
    }
    return story;
  }

  async unfavoriteStory(
    slug: string,
    currentUserId: number,
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId);
    const story = await this.storyRepository.findOne({ slug });

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND);
    }

    const idx = currentUser.favoriteStories
      .map((story) => story.slug)
      .indexOf(slug);

    if (idx >= 0) {
      currentUser.favoriteStories.splice(idx, 1);
      story.favoriteCount--;
      await this.userRepository.save(currentUser);
    }

    return story;
  }

  async buildResponse(
    story: StoryEntity,
    currentUserId: number,
  ): Promise<IStoryResponse> {
    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND);
    }

    const profile = await this.profileService.findOneByUsername(
      story.author.username,
      currentUserId,
    );

    const currentUser = await this.userService.findOneById(currentUserId);

    const isFavorite = currentUser.favoriteStories
      .map((story) => story.title)
      .includes(story.title);
    const isFollow = currentUser.followStories
      .map((story) => story.title)
      .includes(story.title);

    return {
      story: {
        ...story,
        author: this.profileService.buildResponse(profile).profile,
        favorite: isFavorite,
        follow: isFollow,
      },
    };
  }
}
