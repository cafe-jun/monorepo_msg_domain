import { MsgToken } from './jwt/msg-token';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from '../user/dto/user-signup.dto';
import { User } from '@app/entity/domain/user/user.entity';
import { AuthServiceImpl } from './auth.service.impl';
import { UserSignInDto } from '../user/dto/user-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceImpl) private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: UserSignUpDto): Promise<User> {
    const user = await this.authService.signup(signupDto);
    return user;
  }
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: UserSignInDto): Promise<MsgToken> {
    return await this.authService.signin(signinDto);
  }
}