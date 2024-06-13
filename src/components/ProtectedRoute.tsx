import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingContext } from "../context/context";

function ProtectedRoute({ Children }: { Children: React.FC }) {
  const navigate = useNavigate();

  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
    });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Children />;
}

export default ProtectedRoute;
