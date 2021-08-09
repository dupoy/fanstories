import { ProfileType } from './types/profile.type';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { ProfileService } from './profile.service';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  async getProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number,
  ): Promise<ProfileType> {
    return this.profileService.findOneByUsername(username, currentUserId);
  }

  @Post('/:username/follow')
  async followProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number,
  ): Promise<ProfileType> {
    return this.profileService.followProfile(username, currentUserId);
  }

  @Delete('/:username/unfollow')
  async unfollowProfile(
    @Param('username') username: string,
    @User('id') currentUserId: number,
  ): Promise<ProfileType> {
    return this.profileService.unfollowProfile(username, currentUserId);
  }
}
