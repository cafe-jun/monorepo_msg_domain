import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const service = location.pathname.split("/")[3];

  // const getRedirectHandlerByService = () => {
  //   switch (service) {
  //     case "naver":
  //       return <NaverRedirectHandler />;
  //     case "kakao":
  //       return <KakaoRedirectHandler />;
  //     case "google":
  //       return <GoogleRedirectHandler />;
  //     default:
  //       throw new Error("unknown token");
  //   }
  // };

  // const RedirectHandler = getRedirectHandlerByService();
  // getCookie(ACCESS_TOKEN) ? (
  //   <Navigate replace to="/" />
  // ) :
  return (
    <div>
      <div>test</div>
    </div>
  );
};

export default OAuth2RedirectHandler;
