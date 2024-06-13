import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { IAuthData } from "./models/auth.model";
import { AuthContext, LoadingContext } from "./context/context";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [authData, setAuthData] = useState<IAuthData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/Login"));

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthData({
          name: currentUser.displayName!,
          email: currentUser.email!,
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContext.Provider value={{ authData, setAuthData }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Routes>
            <Route path="/" element={<ProtectedRoute Children={Home} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </LoadingContext.Provider>
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
