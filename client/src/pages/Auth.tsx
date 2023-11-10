import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/Form/SignupForm";

import userContext from "../utils/userContext";
import OpenNotification from "../components/shared/Notification";
import { login, signup } from "../api";
import { AUTH } from "../constant";
import SignInForm from "../components/Form/SignInForm";

const Auth: React.FC = () => {
  const { setAlert } = useContext(userContext);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isLoginToggled, setIsLoginToggled] = useState<boolean>(false);

  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const redirection = (accessToken: string) => {
    localStorage.setItem("access-token", accessToken);
    queryClient.refetchQueries([AUTH]);
    navigate("/");
  };

  const handleLogin = useMutation(login, {
    onSuccess: (res) => {
      setAlert({
        isOpen: true,
        title: res.message,
        type: "success",
      });
      redirection(res.result.accessToken);
    },
    onError: (err: any) =>
      setAlert({
        isOpen: true,
        title: err.response.data,
        type: "failure",
      }),
  });

  const handleSignup = useMutation(signup, {
    onSuccess: (res) => {
      setAlert({
        isOpen: true,
        title: res.message,
        type: "success",
      });
      redirection(res.token);
    },
    onError: (err: any) =>
      setAlert({
        isOpen: true,
        title: err.response.data,
        type: "failure",
      }),
  });

  const onChange = (event: React.SyntheticEvent): void => {
    const { name, value } = event.target as HTMLButtonElement;
    isLoginToggled
      ? setLoginInfo({ ...loginInfo, [name]: value })
      : setSignupInfo({ ...signupInfo, [name]: value });
  };

  return (
    <div className="min-h-screen w-screen flex font-sans items-center justify-center text-black bg-white">
      <OpenNotification />
      <div className="h-full md:w-[100%] w-full flex items-center justify-center  md:rounded-r-lg md:rounded-bl-none">
        {/* <div className="h-full md:w-[59.33%] w-full flex items-center justify-center bg-[white] md:rounded-r-lg md:rounded-bl-none"> */}
        <form
          className="w-5/6 h-5/6 flex flex-col justify-center items-center"
          onSubmit={(event: React.SyntheticEvent) => {
            event.preventDefault();
            isLoginToggled
              ? handleLogin.mutate(loginInfo)
              : handleSignup.mutate(signupInfo);
          }}
        >
          <div className="w-full h-1/3 flex justify-center">
            <div className="w-2/5 h-full flex flex-col justify-center">
              <p
                className={`mb-8 text-[#1A2238] font-semibold md:text-base text-sm ${
                  isLoginToggled && "absolute"
                }`}
              >
                {isLoginToggled ? "로그인" : "회원가입"}
              </p>
              <div
                className={`w-full ${
                  isLoginToggled && "h-full flex flex-col justify-center"
                }`}
              >
                {isLoginToggled ? (
                  <SignInForm onChange={onChange} signinInfo={loginInfo} />
                ) : (
                  <SignupForm onChange={onChange} signupInfo={signupInfo} />
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="회원 등록"
            className="rounded-md border border-[#1A2238] px-7 py-3 hover:bg-[#1A2238] hover:text-white trainsition-all duration-300 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Auth;
