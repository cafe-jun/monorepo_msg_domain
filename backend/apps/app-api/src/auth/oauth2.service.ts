import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Strategy } from './strategy/oauth2.strategy';

@Injectable()
export class OAuth2Service {
  constructor(
    @Inject('OAUTH2_STRATEGY') private oauth2Strategy: OAuth2Strategy,
  ) {}
  oauthAuthenticate(service: string) {
    const strategy = this.oauth2Strategy[service];
    if (!strategy) {
      throw new Error('unknown OAuth2 strategy' + service);
    }
    return strategy.getProvider();
  }
}
