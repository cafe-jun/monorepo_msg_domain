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
    await this.apiCallService.post(this.setting.google_user_profile_api);
  }

  getToken(code: string): Promise<any> {
    throw new Error('Method not implemented.');
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
