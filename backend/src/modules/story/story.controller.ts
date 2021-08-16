import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { SaveStoryDto } from './dto/saveStory.dto';
import { StoryService } from './story.service';
import { IFilterQuery } from './types/filterQuery.interface';
import { IStoriesResponse } from './types/storiesResponse.interface';
import { IStoryResponse } from './types/storyResponse.interface';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createStory(
    @Body('story') createStoryDto: SaveStoryDto,
    @User('id') currentUserId: number,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.createStory(createStoryDto, currentUserId),
      currentUserId,
    );
  }

  @Get('/:slug')
  async getStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.findOneBySlug(slug),
      currentUserId,
    );
  }

  @Get()
  async getStories(
    @Query() filterQuery: IFilterQuery,
    @User('id') currentUserId: number,
  ): Promise<IStoriesResponse> {
    return await this.storyService.find(filterQuery, currentUserId);
  }

  @Put('/:slug')
  async updateStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
    @Body('story') updateStoryDto: SaveStoryDto,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.findOneBySlugAndUpdate(
        updateStoryDto,
        slug,
        currentUserId,
      ),
      currentUserId,
    );
  }

  @Post('/:slug/follow')
  @UseGuards(AuthGuard)
  async followStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.followStory(slug, currentUserId),
      currentUserId,
    );
  }

  @Delete('/:slug/unfollow')
  @UseGuards(AuthGuard)
  async unfollowStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.unfollowStory(slug, currentUserId),
      currentUserId,
    );
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard)
  async favoriteStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.favoriteStory(slug, currentUserId),
      currentUserId,
    );
  }

  @Delete('/:slug/unfavorite')
  @UseGuards(AuthGuard)
  async unfavoriteStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IStoryResponse> {
    return this.storyService.buildResponse(
      await this.storyService.unfavoriteStory(slug, currentUserId),
      currentUserId,
    );
  }
}
