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

  async getUserProfile(token: string): Promise<any> {
    try {
      const result = await this.apiCallService.post<NaverUserProfile>(
        this.setting.naver_user_profile_api,
        undefined,
        { Authorization: `Bearer ${token}` },
      );
      return (await lastValueFrom(result)).response;
    } catch (error) {
      console.error(error);
    }
  }

  getProvider(): string {
    const authurl = this.setting.naver_authorization_url;
    const redirectUrl = this.setting.naver_redirect_url;
    const scope = this.setting.naver_scope;
    const client_id = this.setting.naver_client_id;
    return `${authurl}?response_type=code&redirect_uri=${redirectUrl}&client_id=${client_id}&state=${uuidv4()}`;
  }
}
