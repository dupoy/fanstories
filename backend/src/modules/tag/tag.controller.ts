import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../user/guards/auth.guard';
import { CreateTagDto } from './dto/createTag.dto';
import { TagService } from './tag.service';
import { ITagResponse } from './types/tagResponse.interface';
import { ITagsResponse } from './types/tagsResponse.interface';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTag(
    @Body('tag') createTagDto: CreateTagDto
  ): Promise<ITagResponse> {
    return this.tagService.buildResponse(
      await this.tagService.createTag(createTagDto)
    )
  }

  @Get()
  async getTags(): Promise<ITagsResponse> {
    return this.tagService.buildTagsResponse(await this.tagService.find())
  }
}
