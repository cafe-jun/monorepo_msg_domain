import { Observable } from 'rxjs';
export interface OAuth2Strategy {
  getUserProfile(token: string): Promise<UserProfile>;
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
