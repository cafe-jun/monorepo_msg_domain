import { ApiCallService } from './../../common/http/api-call.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  NaverUserProfile,
  OAuth2Strategy,
  UserProfile,
} from './oauth2.strategy';
import { OAuth2NaverSettings } from '../setting/oauth2-naver.settings';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class NaverStrategy implements OAuth2Strategy {
  constructor(
    private setting: OAuth2NaverSettings,
    private readonly apiCallService: ApiCallService,
  ) {}

  getToken(code: string): Promise<any> {
    // grant_type=authorization_code&client_id=jyvqXeaVOVmV&client_secret=527300A0_COq1_XV33cf&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg
    console.log('code', code);
    return this.apiCallService.get(
      this.setting.naver_token_url,
      `grant_type=authorization_code&client_id=${this.setting.naver_client_id}&client_secret=${this.setting.naver_secret_id}&code=${code}&state=RANDOM_STATE`,
    );
  }

  async getUserProfile(token: string): Promise<any> {
    const result = await this.apiCallService.post<{
      resultcode: string;
      message: string;
      response: { id: string; email: string; name: string };
    }>(this.setting.naver_user_profile_api, undefined, {
      Authorization: `Bearer ${token}`,
    });
    return result.response;
  }

  getProvider(): string {
    const authurl = this.setting.naver_authorization_url;
    const redirectUrl = this.setting.naver_redirect_url;
    const scope = this.setting.naver_scope;
    const client_id = this.setting.naver_client_id;
    return `${authurl}?response_type=code&redirect_uri=${redirectUrl}&client_id=${client_id}&state=RANDOM_STATE`;
  }
}
