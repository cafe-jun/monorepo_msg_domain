import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuth2NaverSettings {
  constructor(private configService: ConfigService) {}

  get naver_client_id(): string {
    return this.configService.get('oauth2.naver_client_id');
  }
  get naver_secret_id(): string {
    return this.configService.get('oauth2.naver_secret_id');
  }
  get naver_redirect_url(): string {
    return this.configService.get('oauth2.naver_redirect_url');
  }
  get naver_authorization_url(): string {
    return this.configService.get('oauth2.naver_authorization_url');
  }
  get naver_scope(): string {
    return this.configService.get('oauth2.naver_scope');
  }
}
