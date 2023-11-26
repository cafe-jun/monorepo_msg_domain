import axios from "axios";
import React, { useEffect } from "react";
import { getSignInToken } from "../../api/oauth2";

const KakaoRedirectHandler = () => {
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/oauth2/callback/kakao&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        getSignInToken("kakao", res.data);
      });
  }, []);
  return <div>kakao login 완료</div>;
};

export default KakaoRedirectHandler;
