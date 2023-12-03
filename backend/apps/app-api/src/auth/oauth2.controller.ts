import { OAuth2Service } from './oauth2.service';
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
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from '../user/dto/user-signup.dto';
import { User } from '@app/entity/domain/user/user.entity';
import { AuthServiceImpl } from './auth.service.impl';
import { Request, Response } from 'express';
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
    return res.redirect(`${provider}`);
  }

  @Get('callback/:service')
  async callBackProcess(
    @Param('service') service: string,
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    /**
     * 카카오랑 네이버는 response 타입이 query로 code를 내려줌
     */
    const user = await this.oauthService.callbackProcess(service, code);
    const token = await this.authService.generateToken(user.id, user.email);
    res.cookie('access-token', token.accessToken, { httpOnly: true });
    res.cookie('refresh-token', token.refreshToken, { httpOnly: true });
    return res.redirect('http://localhost:3000/lobby');
  }
}
