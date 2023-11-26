import { Grid } from "@mui/material";
import {
  AuthBody,
  AuthBox,
  AuthContainer,
  AuthContent,
  AuthHeader,
  Container,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import { localSignIn } from "@api/auth/auth";
// import { getCookie, setCookie } from "@common/util/cookie";
// import MuiButton from "@components/control/Button";
// import {
//   ACCESS_TOKEN,
//   GOOGLE_AUTH_URL,
//   KAKAO_AUTH_URL,
//   NAVER_AUTH_URL,
//   REFRESH_TOKEN,
// } from "../../components/Oauth2/oAuth2RedrectUrl";
import {
  GoogleLoginButton,
  KakaoLoginButton,
  NaverLoginButton,
} from "./mui-styled";
import { KakaoLogo } from "./KakaoLogo";
// import { NaverLogo } from "./NaverLogo";
import { GoogleLogo } from "./GoogleLogo";
import { NaverLogo } from "./NaverLogo";
// import useInput from "@hook/useInput";
import styled from "styled-components";
import BackGroundImg from "../../assets/background.png";
import { useEffect } from "react";

// const useStyles = makeStyles({
//   signInForm: {
//     justifyContent: "center",
//   },
//   root: {
//     flexGrow: 1,
//   },
//   logoContainer: {
//     width: "300px",
//     height: "185px",
//   },
//   signInButton: {
//     width: "75%",
//     height: "50px",
//   },
//   signInBtnContainer: {
//     marginTop: "2%",
//   },
// });

const SignIn = () => {
  // const classes = useStyles();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const initNaverLogin = () => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: `http://localhost:3000/oauth2/callback/naver`,
      loginButton: { color: "green", type: 1, height: 60 },
      callbackHandle: true,
    });
    naverLogin.init();
  };
  const initKakaoLogin = () => {
    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      //SDK 초기화 여부 판단 함수
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY); //SDK 초기화 함수
    }
  };
  const NaverLoginHandle = () => {
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
  };
  const KakaoLoginHandle = () => {
    const { Kakao } = window;
    Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/oauth2/callback/kakao",
    });
  };
  useEffect(() => {
    initNaverLogin();
    initKakaoLogin();
  }, []);

  return (
    <div style={{ backgroundImage: BackGroundImg }}>
      <Container>
        <AuthBody>
          <AuthContainer>
            <AuthBox>
              <AuthHeader>
                <AuthContent>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <div id="naverIdLogin" style={{ display: "none" }} />
                      <KakaoLoginButton
                        startIcon={<KakaoLogo />}
                        onClick={KakaoLoginHandle}
                      >
                        카카오로 로그인
                      </KakaoLoginButton>
                    </Grid>
                    <Grid item xs={9}>
                      <NaverLoginButton
                        startIcon={<NaverLogo />}
                        onClick={NaverLoginHandle}
                      >
                        네이버로 로그인
                      </NaverLoginButton>
                    </Grid>
                    {/* <Grid item xs={9}>
                      <GoogleLoginButton
                        startIcon={<GoogleLogo />}
                        href={GOOGLE_AUTH_URL}
                      >
                        구글로 로그인
                      </GoogleLoginButton>
                    </Grid> */}
                  </Grid>
                </AuthContent>
              </AuthHeader>
            </AuthBox>
          </AuthContainer>
        </AuthBody>
      </Container>
    </div>
  );
};

export default SignIn;
