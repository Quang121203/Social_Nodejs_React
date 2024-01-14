import "./register.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from 'react-toastify';


export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const rePassword = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== rePassword.current.value) {
      toast.error("check your input");
    }
    else {
      const res = await axios.post("/register", { email: email.current.value, username: username.current.value, password: password.current.value })

      if (res && res.data) {
        if (+res.data.EC === 0) {
          toast.success(res.data.EM);
        }
        else {
          toast.error(res.data.EM);
        }
      }
    }

  }

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
          <form className="loginBox">
            <input placeholder="Username" className="loginInput" ref={username} required />
            <input placeholder="Email" className="loginInput" ref={email} type="Email" required />
            <input placeholder="Password" className="loginInput" type="password" minLength="6" required ref={password} />
            <input placeholder="Password Again" className="loginInput" type="password" minLength="6" required ref={rePassword} />
            <button className="loginButton" type="submit" onClick={(e) => handleClick(e)}>Sign Up</button>
            <Link className="loginRegisterButton" to="/login">
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
