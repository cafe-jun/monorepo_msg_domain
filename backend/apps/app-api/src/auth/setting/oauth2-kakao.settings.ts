import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuth2KakaoSettings {
  constructor(private configService: ConfigService) {}

  get kakao_client_id(): string {
    return this.configService.get('oauth2.kakao_client_id');
  }
  get kakao_secret_id(): string {
    return this.configService.get('oauth2.kakao_secret_id');
  }
  get kakao_redirect_url(): string {
    return this.configService.get('oauth2.kakao_redirect_url');
  }
  get kakao_authorization_url(): string {
    return this.configService.get('oauth2.kakao_authorization_url');
  }
  get kakao_scope(): string {
    return this.configService.get('oauth2.kakao_scope');
  }
}
