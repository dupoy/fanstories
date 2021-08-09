import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';
import { CharacterService } from '../character/character.service';
import { FandomController } from './fandom.controller';
import { FandomService } from './fandom.service';

@Module({
  imports: [TypeOrmModule.forFeature([FandomEntity, CharacterEntity])],
  controllers: [FandomController],
  providers: [FandomService, CharacterService],
})
export class FandomModule {}
