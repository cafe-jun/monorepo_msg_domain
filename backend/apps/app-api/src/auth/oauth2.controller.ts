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
    console.log('provider: ', provider);
    return res.redirect(`${provider}`);
  }

  @Get('callback/:service')
  async callBackProcess(
    @Param('service') service: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    /**
     * 카카오랑 네이버는 response 타입이 query로 code를 내려줌
     */
    const { code } = req.query;
    await this.oauthService.getToken(service, code as string);
  }
  @Post('profile')
  async getUserProfile(
    @Body('service') service: string,
    @Body('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.oauthService.getUserProfile(service, token);
    return result;
  }
}
