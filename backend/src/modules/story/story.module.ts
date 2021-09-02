import { ChapterEntity } from 'src/entities/chapter.entity';
import { FocusEntity } from 'src/entities/focus.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';
import { RatingEntity } from '../../entities/rating.entity';
import { StoryEntity } from '../../entities/story.entity';
import { TagEntity } from '../../entities/tag.entity';
import { UserEntity } from '../../entities/user.entity';
import { CharacterService } from '../character/character.service';
import { FandomService } from '../fandom/fandom.service';
import { ProfileService } from '../profile/profile.service';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils/utils.service';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoryEntity,
      TagEntity,
      FandomEntity,
      UserEntity,
      CharacterEntity,
      RatingEntity,
      FocusEntity,
      ChapterEntity,
    ]),
  ],
  controllers: [StoryController],
  providers: [
    StoryService,
    TagService,
    FandomService,
    UserService,
    CharacterService,
    ProfileService,
    UtilsService,
  ],
})
export class StoryModule {}
