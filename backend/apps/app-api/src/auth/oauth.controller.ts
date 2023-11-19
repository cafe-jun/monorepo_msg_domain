import { TransactionInterceptor } from '../common/interceptor/transaction.interceptor';
import { JwtGuard } from './guard/jwt.guard';
import { MsgToken } from './jwt/msg-token';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
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

@UseInterceptors(TransactionInterceptor)
@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    @Inject(AuthServiceImpl) private readonly authService: AuthService,
  ) {}

  @Get('authorize/:service')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Param('service') service: string,
    @Res({ passthrough: true }) res: Response,
    @Query('redirect_url') redirectUrl: string,
    @QueryRunner() qr?: QR,
  ): Promise<void> {
    let url;
    let appKey;
    let scope;
    let secret;
    let provider;
    switch (service) {
      case 'kakao':
        url = 'https://kauth.kakao.com/oauth/authorize';
        appKey = 'e69e4c0905ccc65d481a01f1170336fe';
        scope = 'profile_nickname';
        secret = 'x9iLK5b0bpZeqEXTUjQDj6hzIaLMj7lp';
        provider = `${url}?redirect_url=${redirectUrl}&client_id=${appKey}&client_secret=${secret}&scope=${scope}`;
        break;
      case 'naver':
        url = 'https://nid.naver.com/oauth2.0/authorize';
        appKey = '4UO9IR53K9KbdVRl6gvL';
        scope = 'nickname,email';
        secret = 'm7IX3GGqH0';
        provider = `${url}?redirect_url=${redirectUrl}&client_id=${appKey}&scope=${scope}&response_type=${'code'}&auth_type=reprompt`;
        break;
      case 'google':
        url = 'https://accounts.google.com';
        appKey =
          '839515426743-8of51nhaqcukjlvno08oeq1310solb1s.apps.googleusercontent.com';
        secret = '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';
        provider = `${url}?redirect_url=${redirectUrl}&client_id=${appKey}&client_secret=${secret}&scope=${scope}`;
        break;
      default:
        throw Error('unknown service: ' + service);
    }

    res.redirect(`${provider}`);
    return;
  }
}
