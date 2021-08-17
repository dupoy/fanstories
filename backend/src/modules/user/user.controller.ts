import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/register')
  async register(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<IUserResponse> {
    return this.userService.buildResponse(
      await this.userService.createUser(createUserDto)
    )
  }

  @Post('/auth/login')
  async login(
    @Body('user') loginUserDto: LoginUserDto
  ): Promise<IUserResponse> {
    return this.userService.buildResponse(
      await this.userService.loginUser(loginUserDto)
    )
  }

  @Get('/auth')
  async getCurrentUser(
    @User('id') currentUserId: number
  ): Promise<IUserResponse> {
    return this.userService.buildResponse(
      await this.userService.findOneById(currentUserId)
    )
  }
}
