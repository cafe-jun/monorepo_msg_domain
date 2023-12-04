import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import { localSignIn } from "@api/auth/auth";
// import { getCookie, setCookie } from "@common/util/cookie";
// import MuiButton from "@components/control/Button";

import { KakaoLogo } from "./KakaoLogo";
// import { NaverLogo } from "./NaverLogo";
import { GoogleLogo } from "./GoogleLogo";
import { NaverLogo } from "./NaverLogo";
// import useInput from "@hook/useInput";
import styled from "styled-components";
import BackGroundImg from "../../assets/background.png";
import { useEffect } from "react";
import NaverLogoImg from "@assets/social/naver_logo.png";
import {
  GoogleLoginButton,
  KakaoLoginButton,
  NaverLoginButton,
} from "./styled";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from "@components/oauth/RedirectUrl";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 50px;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  padding: 50px 0px;
`;

const ButtonWrapper = styled.div`
  background-color: white;
  border-radius: 50px;
  height: 30%;
  display: flex;
  flex-direction: rows;
  justify-content: center;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
  justify-content: space-around;
`;
const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SignIn = () => {
  return (
    <Wrapper>
      <Title>Drawing To Mind</Title>
      <ButtonWrapper>
        <KakaoLoginButton to={KAKAO_AUTH_URL}>
          <KakaoLogo />
        </KakaoLoginButton>
        <NaverLoginButton to={NAVER_AUTH_URL}>
          <NaverLogo />
        </NaverLoginButton>
        <GoogleLoginButton to={GOOGLE_AUTH_URL}>
          <GoogleLogo />
        </GoogleLoginButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SignIn;
