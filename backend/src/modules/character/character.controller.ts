import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { CharacterService } from './character.service';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
}
