import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterEntity } from '../../entities/character.entity';
import { FandomEntity } from '../../entities/fandom.entity';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity, FandomEntity])],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
