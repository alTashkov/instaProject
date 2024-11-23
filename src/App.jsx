import "./App.css";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import { Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/layouts/PageLayout.jsx";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase.js";
import useAuthStore from "./store/authStore"; // Import your Zustand store
import { useEffect } from "react";

function App() {
  const [authUser] = useAuthState(auth); // React-Firebase-Hooks
  const initializeUser = useAuthStore((state) => state.initializeUser); // Zustand method
  const user = useAuthStore((state) => state.user); // Get Zustand user state
  
  // Sync Zustand store with localStorage on app load
  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  const isLogged = authUser && user;

  return (
    <>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={isLogged ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!isLogged ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path={"/:username"} element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
