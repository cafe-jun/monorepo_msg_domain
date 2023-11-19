import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthServiceImpl } from './auth.service.impl';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AuthController } from './auth.controller';
import { OAuth2Controller } from './oauth.controller';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController, OAuth2Controller],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    AuthServiceImpl,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
