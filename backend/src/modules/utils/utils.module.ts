import { FocusEntity } from 'src/entities/focus.entity';
import { RatingEntity } from 'src/entities/rating.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, FocusEntity])],
  controllers: [UtilsController],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
