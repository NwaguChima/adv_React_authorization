import axios from "../axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const Auth = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    Auth?.setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log("vvvv", response.data.accessToken);

      return {
        ...prev,
        roles: "admin",
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
