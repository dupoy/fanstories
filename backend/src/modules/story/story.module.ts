import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
