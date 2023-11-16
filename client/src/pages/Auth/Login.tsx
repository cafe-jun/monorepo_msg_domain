import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
import {
  ACCESS_TOKEN,
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  REFRESH_TOKEN,
} from "../../components/Oauth2/oAuth2RedrectUrl";
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

const useStyles = makeStyles({
  signInForm: {
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
  },
  logoContainer: {
    width: "300px",
    height: "185px",
  },
  signInButton: {
    width: "75%",
    height: "50px",
  },
  signInBtnContainer: {
    marginTop: "2%",
  },
});

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  //   const { mutate, isLoading } = useMutation(localSignIn, {
  //     onSuccess: (data) => {
  //       setCookie(ACCESS_TOKEN, data.data.accessToken, { path: "/" });
  //       setCookie(REFRESH_TOKEN, data.data.refreshToken, { path: "/" });
  //       navigate("/");
  //     },
  //     onError: () => {
  //       alert("로그인 에러 발생");
  //     },
  //     onSettled: () => {
  //       // queryClient.invalidateQueries("create");
  //     },
  //   });
  //   const onSubmit = (data: any) => {
  //     mutate({ email, password });
  //   };

  return (
    <div style={{ backgroundImage: BackGroundImg }}>
      <Container>
        <AuthBody>
          <AuthContainer>
            <AuthBox>
              <AuthHeader>
                <AuthContent>
                  <div className={classes.signInBtnContainer}>
                    <Grid container className={classes.signInForm} spacing={2}>
                      <Grid item xs={9}>
                        <KakaoLoginButton
                          startIcon={<KakaoLogo />}
                          href={KAKAO_AUTH_URL}
                        >
                          카카오로 로그인
                        </KakaoLoginButton>
                      </Grid>
                      <Grid item xs={9}>
                        <NaverLoginButton
                          startIcon={<NaverLogo />}
                          href={NAVER_AUTH_URL}
                        >
                          네이버로 로그인
                        </NaverLoginButton>
                      </Grid>
                      <Grid item xs={9}>
                        <GoogleLoginButton
                          startIcon={<GoogleLogo />}
                          href={GOOGLE_AUTH_URL}
                        >
                          구글로 로그인
                        </GoogleLoginButton>
                      </Grid>
                    </Grid>
                  </div>
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
