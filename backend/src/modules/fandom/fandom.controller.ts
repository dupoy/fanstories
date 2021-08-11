import { DeleteResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../user/guards/auth.guard';
import { CreateFandomDto } from './dto/createFandom.dto';
import { FandomService } from './fandom.service';
import { IFandomResponse } from './types/fandomResponse.interface';
import { IFandomsResponse } from './types/fandomsResponse.interface';
import { QueryParams } from './types/queryParams.interface';

@Controller('fandoms')
export class FandomController {
  constructor(private readonly fandomService: FandomService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createFandom(
    @Body('fandom') createFandomDto: CreateFandomDto,
  ): Promise<IFandomResponse> {
    return this.fandomService.buildResponse(
      await this.fandomService.createFandom(createFandomDto),
    );
  }

  @Get('/:slug')
  async getFandom(@Param('slug') slug: string): Promise<IFandomResponse> {
    return this.fandomService.buildResponse(
      await this.fandomService.findOneBySlug(slug),
    );
  }

  @Get()
  async getFandoms(@Query() query: QueryParams): Promise<IFandomsResponse> {
    return this.fandomService.find(query);
  }

  @Delete('/:slug')
  async deleteFandom(@Param('slug') slug: string): Promise<DeleteResult> {
    return this.fandomService.findOneAndDelete(slug);
  }
}
