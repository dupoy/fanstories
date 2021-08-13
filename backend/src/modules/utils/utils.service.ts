import { FocusEntity } from 'src/entities/focus.entity';
import { RatingEntity } from 'src/entities/rating.entity';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFucusOrRatingDto } from './dto/ceateFocusOrRating.dto';
import { IFocusesResponse } from './types/focusesResponse.interface';
import { IFocusResponse } from './types/focusResponse.interface';
import { IRatingResponse } from './types/ratingResponse.interface';
import { IRatingsResponse } from './types/ratingsResponse.interface';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(FocusEntity)
    private readonly focusRepository: Repository<FocusEntity>,
  ) {}

  async createRating(
    createRatingDto: CreateFucusOrRatingDto,
  ): Promise<RatingEntity> {
    const condidate = await this.ratingRepository.findOne({
      value: createRatingDto.value,
    });

    if (condidate) {
      throw new HttpException(
        'Rating already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.ratingRepository.save({ ...createRatingDto });
  }

  async createRatings(
    createFocusDtos: CreateFucusOrRatingDto[],
  ): Promise<IRatingsResponse> {
    return {
      ratings: await Promise.all(
        createFocusDtos.map(async (rating) => await this.createRating(rating)),
      ),
    };
  }

  async findOneByValueRating(value: string): Promise<RatingEntity> {
    return this.ratingRepository.findOne({ value });
  }

  async createFocus(
    createFocusDto: CreateFucusOrRatingDto,
  ): Promise<FocusEntity> {
    const condidate = await this.focusRepository.findOne({
      value: createFocusDto.value,
    });

    if (condidate) {
      throw new HttpException(
        'Rating already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.focusRepository.save({ ...createFocusDto });
  }

  async createFocuses(
    createFocusDtos: CreateFucusOrRatingDto[],
  ): Promise<IFocusesResponse> {
    return {
      focuses: await Promise.all(
        createFocusDtos.map(async (focus) => await this.createFocus(focus)),
      ),
    };
  }

  async findOneByValueFocus(value: string): Promise<FocusEntity> {
    return this.focusRepository.findOne({ value });
  }

  buildRatingResponse(rating: RatingEntity): IRatingResponse {
    return { rating };
  }

  buildFocusResponse(focus: FocusEntity): IFocusResponse {
    return { focus };
  }
}
