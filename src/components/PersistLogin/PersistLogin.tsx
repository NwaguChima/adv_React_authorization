import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../api/Hooks/useRefreshToken";
import useAuth from "../../api/Hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const Auth = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !Auth?.auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`AT: ${JSON.stringify(Auth?.auth.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!Auth?.persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  );
};

export default PersistLogin;
