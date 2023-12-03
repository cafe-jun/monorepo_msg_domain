import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Strategy, UserProfile } from './strategy/oauth2.strategy';
import { UserRepository } from '../user/user.respository';
import { UserService } from '../user/user.service';
import { User } from '@app/entity/domain/user/user.entity';

@Injectable()
export class OAuth2Service {
  constructor(
    @Inject('OAUTH2_STRATEGY') private oauth2Strategy: OAuth2Strategy,
    private userService: UserService,
  ) {}
  oauthAuthenticate(service: string) {
    const strategy = this.oauth2Strategy[service];
    if (!strategy) {
      throw new Error('unknown OAuth2 strategy' + service);
    }
    return this.oauth2Strategy[service].getProvider();
  }
  async callbackProcess(service: string, code: string) {
    const strategy = this.oauth2Strategy[service] as OAuth2Strategy;
    const token = await strategy.getToken(code);
    const oauthUser = await this.getUserProfile(strategy, token.access_token);
    console.log('oauthUser', oauthUser);
    const user = await this.userService.findUserByEmail(oauthUser.email);
    if (!user) {
      await this.userService.save(
        User.oauthOf(oauthUser.email, oauthUser.nickname),
      );
    }
    return oauthUser;
  }

  private async getUserProfile(strategy: OAuth2Strategy, token: string) {
    return strategy.getUserProfile(token);
  }
}
