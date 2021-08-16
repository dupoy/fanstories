import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { IMessage } from '../../types/message.interface';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/createChapter.dto';
import { IChapterResponse } from './types/chapterResponse.interface';

@Controller('stories/:slug/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get('/:chapterSlug')
  async getChapter(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @User('id') currentUserId: number,
  ): Promise<IChapterResponse> {
    return this.chapterService.buildResponse(
      await this.chapterService.getChapter(slug, chapterSlug, currentUserId),
    );
  }

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

  @Post('/:chapterSlug')
  @UseGuards(AuthGuard)
  async updateChapter(
    @Body('chapter') createChapterDto: CreateChapterDto,
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @User('id') currentUserId: number,
  ): Promise<IChapterResponse> {
    return this.chapterService.buildResponse(
      await this.chapterService.updateChapter(
        createChapterDto,
        slug,
        currentUserId,
        chapterSlug,
      ),
    );
  }
  @Delete('/:chapterSlug')
  @UseGuards(AuthGuard)
  async deleteChapter(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @User('id') currentUserId: number,
  ): Promise<IMessage> {
    return await this.chapterService.deleteChapter(
      chapterSlug,
      slug,
      currentUserId,
    );
  }
}
