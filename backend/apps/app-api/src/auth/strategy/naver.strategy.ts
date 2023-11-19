import { Injectable } from '@nestjs/common';
import { OAuth2Strategy } from './oauth2.strategy';
import { OAuth2NaverSettings } from '../setting/oauth2-naver.settings';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class NaverStrategy implements OAuth2Strategy {
  constructor(private setting: OAuth2NaverSettings) {}
  getProvider(): string {
    const authurl = this.setting.naver_authorization_url;
    const redirectUrl = this.setting.naver_redirect_url;
    const scope = this.setting.naver_scope;
    const client_id = this.setting.naver_client_id;
    return `${authurl}?response_type=code&redirect_uri=${redirectUrl}&client_id=${client_id}&state=${uuidv4()}`;
  }
}
