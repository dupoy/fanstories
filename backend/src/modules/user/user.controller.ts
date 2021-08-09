import { LoginUserDto } from './dto/loginUser.dto';
import { IUserResponse } from './types/userResponse.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/register')
  async register(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return this.userService.buildResponse(
      await this.userService.createUser(createUserDto),
    );
  }

  @Post('/auth/login')
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    return this.userService.buildResponse(
      await this.userService.loginUser(loginUserDto),
    );
  }
}
