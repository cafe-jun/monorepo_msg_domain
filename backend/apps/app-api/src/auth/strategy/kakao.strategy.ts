import { ForbiddenException, Injectable } from '@nestjs/common';
import { OAuth2KakaoSettings } from '../setting/oauth2-kakao.settings';
import { OAuth2Strategy } from './oauth2.strategy';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, tap } from 'rxjs';
import { ApiCallService } from '../../common/http/api-call.service';

@Injectable()
export class KakaoStrategy implements OAuth2Strategy {
  constructor(
    private setting: OAuth2KakaoSettings,
    private readonly apiCallService: ApiCallService,
  ) {}
  async getUserProfile(token: string): Promise<any> {
    return await this.apiCallService.post(
      this.setting.kakao_user_profile_url,
      undefined,
      { Authorization: `Bearer ${token}` },
    );
  }

  async getToken(code: string): Promise<{
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
  }> {
    return this.apiCallService.post(
      this.setting.kakao_token_url,
      {
        code,
        client_id: this.setting.kakao_client_id,
        client_secret: this.setting.kakao_secret_id,
        redirect_uri: this.setting.kakao_redirect_url,
        grant_type: 'authorization_code',
      },
      {
        'Content-Type': 'application/x-www-form-urlencoded ',
      },
    );
  }
  getProvider(): string {
    const authurl = this.setting.kakao_authorization_url;
    const redirectUrl = this.setting.kakao_redirect_url;
    const scope = this.setting.kakao_scope;
    const client_id = this.setting.kakao_client_id;
    const secret_id = this.setting.kakao_secret_id;
    return `${authurl}?redirect_uri=${redirectUrl}&scope=${scope}&client_id=${client_id}&response_type=code`;
  }
}
