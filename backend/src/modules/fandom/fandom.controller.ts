import { DeleteResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../user/guards/auth.guard';
import { CreateFandomDto } from './dto/createFandom.dto';
import { UpdateFandomDto } from './dto/updateFandom.dto';
import { FandomService } from './fandom.service';
import { IFandomResponse } from './types/fandomResponse.interface';
import { IFandomsResponse } from './types/fandomsResponse.interface';

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

  @Get('')
  async getFandoms(): Promise<IFandomsResponse> {
    return this.fandomService.find();
  }

  @Put('/:slug')
  async updateFandom(
    @Body('fandom') updateFandomDto: UpdateFandomDto,
    @Param('slug') slug: string,
  ): Promise<IFandomResponse> {
    return this.fandomService.buildResponse(
      await this.fandomService.findOneAndUpdate(slug, updateFandomDto),
    );
  }

  @Delete('/:slug')
  async deleteFandom(@Param('slug') slug: string): Promise<DeleteResult> {
    return this.fandomService.findOneAndDelete(slug);
  }
}
