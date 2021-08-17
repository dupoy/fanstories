import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { IUserResponse } from './types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    let condidate = await this.userRepository.findOne({
      email: createUserDto.email,
    })

    if (condidate) {
      throw new HttpException(
        'User with this email is already exist',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    condidate = await this.userRepository.findOne({
      username: createUserDto.username,
    })

    if (condidate) {
      throw new HttpException(
        'User with this username is already exist',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const condidate = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      {select: ['id', 'email', 'username', 'bio', 'image', 'password']}
    )

    if (!condidate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const isPasswordMatch = await compare(
      loginUserDto.password,
      condidate.password
    )

    if (!isPasswordMatch) {
      throw new HttpException(
        'Password mismatch',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    return condidate
  }

  async findOneById(currentUserId: number): Promise<UserEntity> {
    return this.userRepository.findOne(currentUserId, {
      relations: ['followStories', 'favoriteStories'],
    })
  }

  async find(betas: string[]): Promise<UserEntity[]> {
    return this.userRepository.find({username: In(betas)})
  }

  buildResponse(user: UserEntity): IUserResponse {
    delete user.password
    delete user.favoriteStories
    delete user.followStories
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    }
  }

  private generateJwt({id, username, email}: UserEntity): string {
    return sign({id, username, email}, process.env.JWT_SECRET)
  }
}
