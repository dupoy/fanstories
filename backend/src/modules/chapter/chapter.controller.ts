import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/createChapter.dto';
import { IChapterResponse } from './types/chapterResponse.interface';

@Controller('stories/:slug/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createChapter(
    @Body('chapter') createChapterDto: CreateChapterDto,
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<IChapterResponse> {
    return this.chapterService.buildResponse(
      await this.chapterService.createChapter(
        createChapterDto,
        slug,
        currentUserId,
      ),
    );
  }
}
