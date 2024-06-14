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

  // Loading context
  const { loading } = useContext(LoadingContext);

  // Google auth provider
  const provider = new GoogleAuthProvider();

  /**
   * Function to handle signin button click
   */
  const handleClick = () => {
    signInWithRedirect(auth, provider);
  };

  /**
   * Runs on initial load of component and when the loading context changes
   */
  useEffect(() => {
    getRedirectResult(auth).then((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [loading, navigate]);

  // If loading is true return please wait text
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
