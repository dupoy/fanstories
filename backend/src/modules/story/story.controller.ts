import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateStoryDto } from './dto/createStory.dto';
import { UpdateStoryDto } from './dto/updateStory.dto';
import { StoryService } from './story.service';
import { IStoryResponse } from './types/storyResponse.interface';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createStory(
    @Body('story') createStoryDto: CreateStoryDto,
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

  @Put('/:slug')
  async updateStory(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
    @Body('story') updateStoryDto: UpdateStoryDto,
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
}
