import axios from "./axios";
import useAuth from "./Hooks/useAuth";

const useRefreshToken = () => {
  const Auth = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    Auth?.setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log("vvvv", response.data.token);

      return {
        ...prev,
        // roles: "admin",
        accessToken: response.data.token,
      };
    });

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
