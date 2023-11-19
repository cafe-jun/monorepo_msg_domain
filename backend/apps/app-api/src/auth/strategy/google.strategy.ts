import { Injectable } from '@nestjs/common';
import { OAuth2Strategy } from './oauth2.strategy';
import { OAuth2GoogleSettings } from '../setting/oauth2-google.settings';

@Injectable()
export class GoogleStrategy implements OAuth2Strategy {
  constructor(private setting: OAuth2GoogleSettings) {}
  getProvider(): string {
    const authurl = this.setting.google_authorization_url;
    const redirectUrl = this.setting.google_redirect_url;
    const scope = this.setting.google_scope;
    const client_id = this.setting.google_client_id;
    const secret_id = this.setting.google_secret_id;
    return `${authurl}?redirect=${redirectUrl}&scope=${scope}&client_id=${client_id}&client_secret=${secret_id}`;
  }
}
