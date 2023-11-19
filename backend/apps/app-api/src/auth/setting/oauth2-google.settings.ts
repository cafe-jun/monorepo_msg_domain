import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuth2GoogleSettings {
  constructor(private configService: ConfigService) {}

  get google_client_id(): string {
    return this.configService.get('oauth2.google_client_id');
  }
  get google_secret_id(): string {
    return this.configService.get('oauth2.google_secret_id');
  }
  get google_redirect_url(): string {
    return this.configService.get('oauth2.google_redirect_url');
  }
  get google_authorization_url(): string {
    return this.configService.get('oauth2.google_authorization_url');
  }
  get google_scope(): string {
    return this.configService.get('oauth2.google_scope');
  }
}
