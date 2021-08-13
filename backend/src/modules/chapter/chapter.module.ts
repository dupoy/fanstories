import { ChapterEntity } from 'src/entities/chapter.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoryEntity } from '../../entities/story.entity';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity, StoryEntity])],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
