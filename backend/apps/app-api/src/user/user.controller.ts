import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class userController {
  constructor(private userService: UserService) {}

  @Get('auth/check')
  async getCheckUser() {
    return await this.userService.findUserById(9);
  }
  @Get('')
  async getUser() {
    return await this.userService.findUserByIds([9, 10, 11, 12]);
  }
}
