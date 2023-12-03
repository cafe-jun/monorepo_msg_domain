import { ApiCallService } from './../../common/http/api-call.service';
import { Injectable } from '@nestjs/common';
import { OAuth2Strategy, UserProfile } from './oauth2.strategy';
import { OAuth2GoogleSettings } from '../setting/oauth2-google.settings';

@Injectable()
export class GoogleStrategy implements OAuth2Strategy {
  constructor(
    private setting: OAuth2GoogleSettings,
    private apiCallService: ApiCallService,
  ) {}
  async getUserProfile(token: string): Promise<UserProfile> {
    return await this.apiCallService.post(
      this.setting.google_user_profile_api,
      undefined,
      { Authorization: `Bearer ${token}` },
    );
  }

  getToken(code: string): Promise<any> {
    return this.apiCallService.post(this.setting.google_token_url, {
      code,
      client_id: this.setting.google_client_id,
      client_secret: this.setting.google_secret_id,
      redirect_uri: this.setting.google_redirect_url,
      grant_type: 'authorization_code',
    });
  }

  getProvider(): string {
    const authurl = this.setting.google_authorization_url;
    const redirectUrl = this.setting.google_redirect_url;
    const scope = this.setting.google_scope;
    const client_id = this.setting.google_client_id;
    const envParam = `${authurl}?redirect_uri=${redirectUrl}&scope=${scope}&client_id=${client_id}`;
    return `${envParam}&response_type=code&include_granted_scopes=true`;
  }
}
