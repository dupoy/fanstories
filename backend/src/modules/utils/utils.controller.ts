import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../user/guards/auth.guard';
import { CreateFucusOrRatingDto } from './dto/ceateFocusOrRating.dto';
import { IFocusesResponse } from './types/focusesResponse.interface';
import { IRatingsResponse } from './types/ratingsResponse.interface';
import { UtilsService } from './utils.service';

@Controller()
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Post('ratings')
  @UseGuards(AuthGuard)
  async createRatings(
    @Body('ratings') createRatingDtos: CreateFucusOrRatingDto[],
  ): Promise<IRatingsResponse> {
    return this.utilsService.createRatings(createRatingDtos);
  }

  @Post('focuses')
  @UseGuards(AuthGuard)
  async createFocuses(
    @Body('focuses') createFocusDtos: CreateFucusOrRatingDto[],
  ): Promise<IFocusesResponse> {
    return this.utilsService.createFocuses(createFocusDtos);
  }
}
