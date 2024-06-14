import { useContext } from "react";
import { AuthContext } from "../context/context";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // Auth context
  const { authData } = useContext(AuthContext);

  /**
   * Function to handle signout click
   */
  const handleSignoutClick = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <header className="header">
      <h1 style={{ fontSize: "20px" }}>Real time chat app</h1>
      <button onClick={handleSignoutClick}>{authData?.name}</button>
    </header>
  );
}

export default Header;
