import Axios from "axios";

const axios = Axios.create();

export const getSignInToken = (service: string, token: string) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_API}/api/oauth2/profile`,
    {
      token,
      service,
    },
    {
      withCredentials: true,
    }
  );
};
