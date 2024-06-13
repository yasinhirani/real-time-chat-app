import {
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/context";

function Login() {
  const navigate = useNavigate();

  const { loading } = useContext(LoadingContext);

  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    getRedirectResult(auth).then((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [loading, navigate]);

  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <div className="login-wrapper">
      <button className="btn-signin" onClick={handleClick}>
        Sign in
      </button>
    </div>
  );
}

export default Login;
