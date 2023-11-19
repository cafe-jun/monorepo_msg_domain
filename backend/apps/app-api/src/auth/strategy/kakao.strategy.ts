import { Injectable } from '@nestjs/common';
import { OAuth2KakaoSettings } from '../setting/oauth2-kakao.settings';
import { OAuth2Strategy } from './oauth2.strategy';

@Injectable()
export class KakaoStrategy implements OAuth2Strategy {
  constructor(private setting: OAuth2KakaoSettings) {}
  getProvider(): string {
    const authurl = this.setting.kakao_authorization_url;
    const redirectUrl = this.setting.kakao_redirect_url;
    const scope = this.setting.kakao_scope;
    const client_id = this.setting.kakao_client_id;
    const secret_id = this.setting.kakao_secret_id;
    return `${authurl}?redirect=${redirectUrl}&scope=${scope}&client_id=${client_id}&client_secret=${secret_id}`;
  }
}
