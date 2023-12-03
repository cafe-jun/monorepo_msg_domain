import { Observable } from 'rxjs';

type OAuth2Provider = 'kakao' | 'naver' | 'google';

export interface OAuth2Strategy {
  getToken(code: string): Promise<{
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
  }>;
  getUserProfile(token: string): Promise<any>;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export interface KakaoUserProfile {
  response: {
    id: string;
    email: string;
    name: string;
  };
}

export interface GoogleUserProfile {
  response: {
    id: string;
    email: string;
    name: string;
  };
}

export interface NaverUserProfile {
  response: {
    id: string;
    email: string;
    name: string;
  };
}
