import { registerAs } from '@nestjs/config';

export default registerAs('oauth2', () => {
  return {
    google_client_id: process.env.OAUTH2_GOOGLE_CLIENT_ID,
    google_secret_id: process.env.OAUTH2_GOOGLE_SECRET_ID,
    google_redirect_url: process.env.OAUTH2_GOOGLE_REDIRECT_URL,
    google_authorization_url: process.env.OAUTH2_GOOGLE_AUTHORIZATION_URL,
    google_token_url: process.env.OAUTH2_GOOGLE_TOKEN_URL,
    google_scope: process.env.OAUTH2_GOOGLE_SCOPE,
    naver_client_id: process.env.OAUTH2_NAVER_CLIENT_ID,
    naver_secret_id: process.env.OAUTH2_NAVER_SECRET_ID,
    naver_redirect_url: process.env.OAUTH2_NAVER_REDIRECT_URL,
    naver_authorization_url: process.env.OAUTH2_NAVER_AUTHORIZATION_URL,
    naver_token_url: process.env.OAUTH2_NAVER_TOKEN_URL,
    naver_scope: process.env.OAUTH2_NAVER_SCOPE,
    kakao_client_id: process.env.OAUTH2_KAKAO_CLIENT_ID,
    kakao_secret_id: process.env.OAUTH2_KAKAO_SECRET_ID,
    kakao_redirect_url: process.env.OAUTH2_KAKAO_REDIRECT_URL,
    kakao_authorization_url: process.env.OAUTH2_KAKAO_AUTHORIZATION_URL,
    kakao_token_url: process.env.OAUTH2_GOOGLE_TOKEN_URL,
    kakao_scope: process.env.OAUTH2_KAKAO_SCOPE,
  };
});
