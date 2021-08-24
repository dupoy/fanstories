import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { ProfileService } from './profile.service';
import { IProfileResponse } from './types/profileResponse.interface';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  async getProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number
  ): Promise<IProfileResponse> {
    return this.profileService.buildResponse(
      await this.profileService.findOneByUsername(username, currentUserId)
    )
  }

  @Post('/:username/follow')
  @UseGuards(AuthGuard)
  async followProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number
  ): Promise<IProfileResponse> {
    return this.profileService.buildResponse(
      await this.profileService.followProfile(username, currentUserId)
    )
  }

  @Delete('/:username/follow')
  @UseGuards(AuthGuard)
  async unfollowProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number
  ): Promise<IProfileResponse> {
    return this.profileService.buildResponse(
      await this.profileService.unfollowProfile(username, currentUserId)
    )
  }
}
