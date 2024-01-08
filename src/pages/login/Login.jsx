import { useRef, useContext } from "react";
import "./login.css";
import axios from "../../config/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { user, dispatch, isFetching } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email.current.value, password.current.value, dispatch);
  }

  const login = async (email, password, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/login", { email, password });
      if (+res.data.EC === 1) {
        toast.error(res.data.EM);
      }
      if (+res.data.EC === 0) {
        toast.success(res.data.EM);
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.DT });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleLogin(e)}>
            <input placeholder="Email" className="loginInput" ref={email} type="email" required />
            <input placeholder="Password" className="loginInput" ref={password} type="password" minLength="6" required />
            <button className="loginButton" type="submit" disabled={isFetching}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
