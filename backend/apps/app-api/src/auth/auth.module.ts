import { ConfigModule, ConfigService } from '@nestjs/config';
import { OAuth2Strategy } from './strategy/oauth2.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthServiceImpl } from './auth.service.impl';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AuthController } from './auth.controller';
import { OAuth2Controller } from './oauth2.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { OAuth2NaverSettings } from './setting/oauth2-naver.settings';
import { OAuth2GoogleSettings } from './setting/oauth2-google.settings';
import { OAuth2KakaoSettings } from './setting/oauth2-kakao.settings';
import { OAuth2Service } from './oauth2.service';
import configureation from './setting/configureation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configureation],
    }),
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController, OAuth2Controller],
  providers: [
    ConfigService,
    OAuth2Service,
    KakaoStrategy,
    NaverStrategy,
    GoogleStrategy,
    OAuth2KakaoSettings,
    OAuth2NaverSettings,
    OAuth2GoogleSettings,
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: 'OAUTH2_STRATEGY',
      useFactory: (
        kakaoStrategy: KakaoStrategy,
        naverStrategy: NaverStrategy,
        googleStrategy: GoogleStrategy,
      ) => {
        return {
          kakao: kakaoStrategy,
          naver: naverStrategy,
          google: googleStrategy,
        };
      },
      inject: [KakaoStrategy, NaverStrategy, GoogleStrategy],
    },
    AuthServiceImpl,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: ['OAUTH2_STRATEGY'],
})
export class AuthModule {}
