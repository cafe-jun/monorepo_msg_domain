import React from "react";

import NaverLogoImg from "@assets/social/naver_logo.png";

export const NaverLogo = () => (
  <div>
    <img
      src={NaverLogoImg}
      height={50}
      width={55}
      style={{
        paddingLeft: "1px",
        paddingTop: "2px",
        marginLeft: "9px",
        marginTop: "5px",
      }}
    />
  </div>
);
