import { ForbiddenException, Injectable } from '@nestjs/common';
import { OAuth2KakaoSettings } from '../setting/oauth2-kakao.settings';
import { OAuth2Strategy } from './oauth2.strategy';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class KakaoStrategy implements OAuth2Strategy {
  constructor(
    private setting: OAuth2KakaoSettings,
    private readonly httpService: HttpService,
  ) {}
  getUserProfile(token: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  vertifyToken(code: string): Promise<void> {
    throw new Error('Method not implemented.');
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
