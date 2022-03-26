import React, { FormEvent } from "react";
import { useRef, useState, useEffect } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PWD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,}$/;

const REGISTER_URL = "/api/v1/users/signup";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current!.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    // preventing button being enabled with a JS hack

    const validate1 = EMAIL_REGEX.test(email);
    const validate2 = PWD_REGEX.test(pwd);

    if (!validate1 || !validate2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(email, pwd);
    // setSuccess(true);

    try {
      let data = JSON.stringify({
        name: "Test",
        email,
        password: pwd,
      });
      console.log("now", data);
      const response = await axios.post(REGISTER_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      // Clear Input fields
    } catch (error: any) {
      // if (!error?.response) {
      //   setErrMsg("No Server Response");
      // } else if (error.response?.status === 403) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg("Registration Failed");
      // }

      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.data) {
        setErrMsg(error.response.data.message);
      } else {
        setErrMsg("Registration Failed");
      }

      errRef.current!.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">
              Click here to <span className="signin_success">Sign In</span>
            </a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <i className="circle">
                  <GiCheckMark />
                </i>
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <i>
                  <FaTimes />
                </i>
              </span>
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              className={
                emailFocus && email && !validEmail ? "fail" : "success"
              }
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <i className="circle">
                <FaInfoCircle />
              </i>
              must be a valid email
              <br />
              example@gmail.com
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <i>
                  <GiCheckMark />
                </i>
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <i>
                  <FaTimes />
                </i>
              </span>
            </label>
            <input
              type="password"
              id="password"
              className={pwdFocus && !validPwd ? "fail" : "success"}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <div
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <i className="circle">
                <FaInfoCircle />
              </i>
              <div>
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                <p>
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </div>
            </div>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <i>
                  <GiCheckMark />
                </i>
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <i>
                  <FaTimes />
                </i>
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              className={matchFocus && !validMatch ? "fail" : "success"}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              {" "}
              <i>
                <FaInfoCircle />
              </i>{" "}
              Must match the password input field
            </p>

            <button
              disabled={!validEmail || !validMatch || !validPwd ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p className="existing_user">
            Already registerd ?<br />
            <span className="line">
              {/* usually a react Link Element */}
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
