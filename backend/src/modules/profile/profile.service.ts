import { IProfileResponse } from './types/profileResponse.interface';
import { UserEntity } from './../../entities/user.entity';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(
    username: string,
    currentUserId: number,
  ): Promise<ProfileType> {
    const profile = await this.userRepository.findOne({ username });

    if (!profile) {
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);
    }

    const currentUser = await this.userRepository.findOne(currentUserId, {
      relations: ['followAuthors'],
    });
    const currentUserFollowProfileIds = currentUser.followAuthors.map(
      (profile) => profile.id,
    );

    const isFollow = currentUserFollowProfileIds.includes(profile.id);

    return { ...profile, following: isFollow };
  }

  async followProfile(
    username: string,
    currentUserId: number,
  ): Promise<ProfileType> {
    const profile = await this.userRepository.findOne({ username });

    if (!profile) {
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);
    }

    const currentUser = await this.userRepository.findOne(currentUserId, {
      relations: ['followAuthors'],
    });

    const currentUserFollowProfileIds = currentUser.followAuthors.map(
      (profile) => profile.id,
    );

    if (!currentUserFollowProfileIds.includes(profile.id)) {
      currentUser.followAuthors.push(profile);
      await this.userRepository.save(currentUser);
      await this.userRepository.save(profile);
    }

    return { ...profile, following: true };
  }

  async unfollowProfile(
    username: string,
    currentUserId: number,
  ): Promise<ProfileType> {
    const profile = await this.userRepository.findOne({ username });

    if (!profile) {
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);
    }

    const currentUser = await this.userRepository.findOne(currentUserId, {
      relations: ['followAuthors'],
    });

    const currentUserFollowProfileIds = currentUser.followAuthors.map(
      (profile) => profile.id,
    );

    const index = currentUserFollowProfileIds.indexOf(profile.id);

    if (index >= 0) {
      currentUser.followAuthors.splice(index, 1);
      await this.userRepository.save(currentUser);
      await this.userRepository.save(profile);
    }

    return { ...profile, following: false };
  }

  buildResponse(profile: ProfileType): IProfileResponse {
    delete profile.email;
    return {
      profile,
    };
  }
}
