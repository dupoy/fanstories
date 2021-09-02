import slugify from 'slugify';
import { ChapterEntity } from 'src/entities/chapter.entity';
import { DeleteResult, Repository } from 'typeorm';

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
    @InjectRepository(ChapterEntity)
    private readonly chapterRepository: Repository<ChapterEntity>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly fandomService: FandomService,
    private readonly profileService: ProfileService,
    private readonly utilsService: UtilsService
  ) {}

  async createStory(
    createStoryDto: SaveStoryDto,
    currentUserId: number
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId)

    const slug = slugify(createStoryDto.title)
    const condidate = await this.storyRepository.findOne({slug})

    if (condidate) {
      throw new HttpException(
        'Story already exist',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    const rating = await this.utilsService.findOneByValueRating(
      createStoryDto.rating
    )

    const focus = await this.utilsService.findOneByValueFocus(
      createStoryDto.focus
    )

    const tags = await this.tagService.find(createStoryDto.tags || [])

    const fandoms = (
      await this.fandomService.find({
        titles: createStoryDto.fandoms || [],
      })
    ).fandoms.map((fandom) => {
      delete fandom.characters
      return fandom
    })

    const betas = await this.userService.find(createStoryDto.betas || [])

    const story = Object.assign(new StoryEntity(), {
      ...createStoryDto,
      fandoms,
      betas,
      tags,
      focus,
      rating,
      author: currentUser,
    })

    return this.storyRepository.save(story)
  }

  async findOneBySlug(slug: string): Promise<StoryEntity> {
    return await this.storyRepository.findOne({slug})
  }

  async findOneBySlugAndUpdate(
    updateStoryDto: SaveStoryDto,
    slug: string,
    currentUserId: number
  ): Promise<StoryEntity> {
    const story = await this.storyRepository.findOne({slug})

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot edit this story',
        HttpStatus.BAD_REQUEST
      )
    }

    const rating = await this.utilsService.findOneByValueRating(
      updateStoryDto.rating
    )

    const focus = await this.utilsService.findOneByValueFocus(
      updateStoryDto.focus
    )

    const tags = await this.tagService.find(updateStoryDto.tags)
    const fandoms = (
      await this.fandomService.find({
        titles: updateStoryDto.fandoms,
      })
    ).fandoms.map((fandom) => {
      return fandom
    })

    return this.storyRepository.save(
      Object.assign(story, updateStoryDto, {
        focus,
        rating,
        fandoms,
        tags,
      })
    )
  }

  async find(
    filterQuery: IFilterQuery,
    currentUserId: number
  ): Promise<IStoriesResponse> {
    const queryBuilder = this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.author', 'author')
      .leftJoinAndSelect('story.rating', 'rating')
      .leftJoinAndSelect('story.focus', 'focus')

    if (filterQuery.favorited) {
      const username = filterQuery.favorited.trim()
      const user = await this.userRepository.findOne(
        {username},
        {relations: ['favoriteStories']}
      )

      const userFavoritedIds =
        user.favoriteStories.map((story) => story.id) || []

      if (userFavoritedIds.length > 0) {
        queryBuilder.andWhere('story.id IN (:...ids)', {
          ids: userFavoritedIds,
        })
      } else {
        queryBuilder.andWhere('0=1')
      }
    }

    if (filterQuery.followed) {
      const username = filterQuery.followed.trim()
      const user = await this.userRepository.findOne(
        {username},
        {relations: ['followStories']}
      )

      const userFollowedIds = user.followStories.map((story) => story.id) || []

      if (userFollowedIds.length > 0) {
        queryBuilder.andWhere('story.id IN (:...ids)', {
          ids: userFollowedIds,
        })
      } else {
        queryBuilder.andWhere('0=1')
      }
    }

    if (filterQuery.author) {
      const username = filterQuery.author.trim()
      const user = await this.userRepository.findOne(
        {username},
        {relations: ['stories']}
      )

      const userStoryIds = user.stories.map((story) => story.id) || []

      if (userStoryIds.length > 0) {
        queryBuilder.andWhere('story.id IN (:...ids)', {
          ids: userStoryIds,
        })
      } else {
        queryBuilder.andWhere('0=1')
      }
    }

    if (filterQuery.title) {
      const title = filterQuery.title.trim()
      queryBuilder.andWhere('story.title LIKE :title', {
        title: `%${title}%`,
      })
    }

    if (filterQuery.words) {
      const words = +filterQuery.words
      queryBuilder.andWhere('story.words >= :words', {
        words,
      })
    }

    if (filterQuery.characters) {
      const characters = filterQuery.characters.split(';')

      queryBuilder.andWhere(
        'story.characters::text[] && (:characters)::text[]',
        {
          characters,
        }
      )
    }

    if (filterQuery.excludeCharacters) {
      const characters = filterQuery.excludeCharacters.split(';')

      queryBuilder.andWhere(
        'NOT(story.characters::text[] && (:characters)::text[])',
        {
          characters,
        }
      )
    }

    if (filterQuery.pairings) {
      const pairings = filterQuery.pairings.split(';')
      queryBuilder.andWhere('story.pairings::text[] @> (:pairings)::text[]', {
        pairings,
      })
    }

    if (filterQuery.excludePairings) {
      const pairings = filterQuery.excludePairings.split(';')

      queryBuilder.andWhere('NOT(story.pairings && (:pairings))', {
        pairings,
      })
    }

    if (filterQuery.ratings) {
      const ratings = filterQuery.ratings.split(';')

      const ratingIds = (
        await Promise.all(
          ratings.map((rating) =>
            this.utilsService.findOneByValueRating(rating)
          )
        )
      ).map((rating) => rating.id)

      queryBuilder.andWhere('rating.id IN (:...ids)', {
        ids: ratingIds,
      })
    }

    if (filterQuery.focuses) {
      const focuses = filterQuery.focuses.split(';')

      const focusIds = (
        await Promise.all(
          focuses.map((focus) => this.utilsService.findOneByValueFocus(focus))
        )
      ).map((focus) => focus.id)

      queryBuilder.andWhere('focus.id IN (:...ids)', {
        ids: focusIds,
      })
    }

    if (filterQuery.fandoms) {
      const fandoms = JSON.stringify(
        (
          await this.fandomService.find({
            titles: filterQuery.fandoms.split(';'),
          })
        ).fandoms.map((fandom) => {
          delete fandom.characters
          return fandom
        })
      )

      queryBuilder.andWhere('story.fandoms::jsonb @> :fandoms::jsonb', {
        fandoms,
      })
    }

    if (filterQuery.excludeFandoms) {
      const fandoms = JSON.stringify(
        (
          await this.fandomService.find({
            titles: filterQuery.excludeFandoms.split(';'),
          })
        ).fandoms.map((fandom) => {
          delete fandom.characters
          return fandom
        })
      )

      queryBuilder.andWhere('NOT(story.fandoms::jsonb @> :fandoms::jsonb)', {
        fandoms,
      })
    }

    if (filterQuery.tags) {
      const tags = JSON.stringify(
        await this.tagService.find(filterQuery.tags.split(';'))
      )

      queryBuilder.andWhere('story.tags::jsonb @> :tags::jsonb', {
        tags,
      })
    }

    if (filterQuery.excludeTags) {
      const tags = JSON.stringify(
        await this.tagService.find(filterQuery.excludeTags.split(';'))
      )

      queryBuilder.andWhere('NOT(story.tags::jsonb @> :tags::jsonb)', {
        tags,
      })
    }

    if (filterQuery.order && filterQuery.sort) {
      const sort = `story.${filterQuery.sort}`
      queryBuilder.orderBy({
        [sort]: filterQuery.order,
      })
    }

    const storyCount = await queryBuilder.getCount()

    if (filterQuery.limit) {
      queryBuilder.limit(filterQuery.limit)
    }

    if (filterQuery.offset) {
      queryBuilder.offset(filterQuery.offset)
    }

    const stories = await queryBuilder.getMany()

    return {
      stories: await Promise.all(
        stories.map(async (story) => {
          delete story.chapters
          return (await this.buildResponse(story, currentUserId)).story
        })
      ),
      storyCount,
    }
  }

  async followStory(slug: string, currentUserId: number): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId)
    const story = await this.storyRepository.findOne({slug})

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id === currentUserId) {
      throw new HttpException(
        'You cannot follow yours story',
        HttpStatus.BAD_REQUEST
      )
    }

    const inFollow = await currentUser.followStories
      .map((story) => story.slug)
      .includes(slug)

    if (!inFollow) {
      currentUser.followStories.push(story)
      story.followCount++
      await this.userRepository.save(currentUser)
      await this.storyRepository.save(story)
    }
    return story
  }

  async unfollowStory(
    slug: string,
    currentUserId: number
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId)
    const story = await this.storyRepository.findOne({slug})

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id === currentUserId) {
      throw new HttpException(
        'You cannot unfollow yours story',
        HttpStatus.BAD_REQUEST
      )
    }

    const idx = currentUser.followStories
      .map((story) => story.slug)
      .indexOf(slug)

    if (idx >= 0) {
      currentUser.followStories.splice(idx, 1)
      story.followCount--
      await this.userRepository.save(currentUser)
      await this.storyRepository.save(story)
    }

    return story
  }

  async favoriteStory(
    slug: string,
    currentUserId: number
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId)
    const story = await this.storyRepository.findOne({slug})

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id === currentUserId) {
      throw new HttpException(
        'You cannot favorite yours story',
        HttpStatus.BAD_REQUEST
      )
    }

    const inFollow = currentUser.favoriteStories
      .map((story) => story.slug)
      .includes(slug)

    if (!inFollow) {
      currentUser.favoriteStories.push(story)
      ++story.favoriteCount
      await this.userRepository.save(currentUser)
      await this.storyRepository.save(story)
    }
    return story
  }

  async unfavoriteStory(
    slug: string,
    currentUserId: number
  ): Promise<StoryEntity> {
    const currentUser = await this.userService.findOneById(currentUserId)
    const story = await this.storyRepository.findOne({slug})

    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id === currentUserId) {
      throw new HttpException(
        'You cannot unfavorite yours story',
        HttpStatus.BAD_REQUEST
      )
    }

    const idx = currentUser.favoriteStories
      .map((story) => story.slug)
      .indexOf(slug)

    if (idx >= 0) {
      currentUser.favoriteStories.splice(idx, 1)
      --story.favoriteCount
      await this.userRepository.save(currentUser)
      await this.storyRepository.save(story)
    }

    return story
  }

  async findOneBySlugAndDelete(
    slug: string,
    currentUserId: number
  ): Promise<DeleteResult> {
    const story = await this.storyRepository.findOne(
      {slug},
      {relations: ['chapters']}
    )

    if (!story) {
      throw new HttpException("Story didn't exist", HttpStatus.NOT_FOUND)
    }

    if (story.author.id !== currentUserId) {
      throw new HttpException(
        'You cannot delete this story',
        HttpStatus.NOT_FOUND
      )
    }

    story.chapters.forEach((chapter) =>
      this.chapterRepository.delete(chapter.id)
    )

    return this.storyRepository.delete(story.id)
  }

  async buildResponse(
    story: StoryEntity,
    currentUserId: number
  ): Promise<IStoryResponse> {
    if (!story) {
      throw new HttpException("Story doesn't exist", HttpStatus.NOT_FOUND)
    }

    const profile = await this.profileService.findOneByUsername(
      story.author.username,
      currentUserId
    )

    const currentUser = await this.userService.findOneById(currentUserId)

    const isFavorite = currentUser.favoriteStories
      .map((story) => story.title)
      .includes(story.title)
    const isFollow = currentUser.followStories
      .map((story) => story.title)
      .includes(story.title)

    return {
      story: {
        ...story,
        author: this.profileService.buildResponse(profile).profile,
        favorite: isFavorite,
        follow: isFollow,
      },
    }
  }
}
