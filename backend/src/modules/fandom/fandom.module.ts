import { CharacterEntity } from './../../entities/character.entity';
import { FandomEntity } from './../../entities/fandom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FandomService } from './fandom.service';
import { FandomController } from './fandom.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FandomEntity, CharacterEntity])],
  controllers: [FandomController],
  providers: [FandomService],
})
export class FandomModule {}
