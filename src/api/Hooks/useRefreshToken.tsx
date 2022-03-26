import axios from "../axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const Auth = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    console.log("kkkk", response);

    Auth?.setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log("vvvv", response.data.token);

      return {
        ...prev,
        role: response?.data?.data.role,
        accessToken: response.data.token,
      };
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
