export const OAUTH_API_BASE_URL = "http://localhost:3001";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const OAUTH2_REDIRECT_URI = "http://localhost:3001/api/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  OAUTH_API_BASE_URL +
  "/api/oauth2/authorize/google?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
  OAUTH_API_BASE_URL +
  "/api/oauth2/authorize/kakao?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL =
  OAUTH_API_BASE_URL +
  "/api/oauth2/authorize/naver?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
