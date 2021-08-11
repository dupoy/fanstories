import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';
import { StoryEntity } from '../../entities/story.entity';
import { TagEntity } from '../../entities/tag.entity';
import { UserEntity } from '../../entities/user.entity';
import { CharacterService } from '../character/character.service';
import { FandomService } from '../fandom/fandom.service';
import { ProfileService } from '../profile/profile.service';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
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
  ],
})
export class StoryModule {}
