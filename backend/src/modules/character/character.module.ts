import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
