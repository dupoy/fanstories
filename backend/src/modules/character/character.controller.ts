import { Body, Controller, Param, Post } from '@nestjs/common';

import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { ICharacterResponse } from './types/characterResponse.interface';

@Controller('fandoms/:slug/characters/')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async createCharacter(
    @Param('slug') slug: string,
    @Body('character') createCharacterDto: CreateCharacterDto,
  ): Promise<ICharacterResponse> {
    return this.characterService.buildResponse(
      await this.characterService.createCharacter(createCharacterDto, slug),
    );
  }
}
