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
    return strategy.getProvider();
  }
  async getToken(service: string, code: string) {
    const result = await this.oauth2Strategy[service].getToken(code);
    return result;
  }

  async vertifyToken(service: string, code: string) {
    const result = await this.oauth2Strategy[service].getToken(code);
    return result;
  }
  async getUserProfile(service: string, token: string) {
    const result = (await this.oauth2Strategy[service].getUserProfile(
      token,
    )) as UserProfile;
    return result;
  }
}
