import { Body, Controller, Post } from '@nestjs/common';

import { CreateTagDto } from './dto/createTag.dto';
import { TagService } from './tag.service';
import { ITagResponse } from './types/tagResponse.interface';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(
    @Body('tag') createTagDto: CreateTagDto,
  ): Promise<ITagResponse> {
    return this.tagService.buildResponse(
      await this.tagService.createTag(createTagDto),
    );
  }
}
