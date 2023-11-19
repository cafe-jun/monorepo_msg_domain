import { OAuth2Service } from './oauth2.service';
import { TransactionInterceptor } from '../common/interceptor/transaction.interceptor';
import { JwtGuard } from './guard/jwt.guard';
import { MsgToken } from './jwt/msg-token';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from '../user/dto/user-signup.dto';
import { User } from '@app/entity/domain/user/user.entity';
import { AuthServiceImpl } from './auth.service.impl';
import { UserSignInDto } from '../user/dto/user-signin.dto';
import { CurrentUser } from './decorator/current-user.decorater';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { QueryRunner } from './decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Response } from 'express';
import { Logger } from 'nestjs-pino';

@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    @Inject(AuthServiceImpl) private readonly authService: AuthService,
    private readonly oauthService: OAuth2Service,
  ) {}

  @Get('authorize/:service')
  async signup(
    @Param('service') service: string,
    @Res() res: Response,
  ): Promise<void> {
    const provider = await this.oauthService.oauthAuthenticate(service);
    console.log('provider', provider);
    return res.redirect(`${provider}`);
  }
}
