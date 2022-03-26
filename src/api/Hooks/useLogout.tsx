import axios from "../axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const Auth = useAuth();

  const logout = async () => {
    Auth?.setAuth({});
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
