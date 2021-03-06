import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../api/Hooks/useAuth";

const LOGIN_URL = "/api/v1/users/login";
const Login = () => {
  const Auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current!.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({ email, password: pwd });
      const response = await axios.post(LOGIN_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = response?.data?.token;
      const role = response?.data?.data.role;
      Auth?.setAuth({ email, pwd, role, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (error: any) {
      console.log(error.response?.status);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Invalid username or password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const togglePersist = () => {
    Auth?.setPersist((prev: boolean) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", Auth?.persist as any);
  }, [Auth?.persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account ?<br />
        <span className="line">
          <Link to="/register">Sign up</Link>
          <div className="persistCheck">
            <input
              type="checkbox"
              name=""
              id="persist"
              onChange={togglePersist}
              checked={Auth?.persist as any}
            />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </span>
      </p>
    </section>
  );
};

export default Login;
