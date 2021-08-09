import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
