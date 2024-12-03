import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";

import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser, loading } = useAuthContext();
  console.log("Authenticated user:", authUser);

  if (loading) return null;

  return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
            <Route path="likes" element={<ProtectedRoute><LikesPage /></ProtectedRoute>} />
          </Route>
        </Routes>
        <Toaster />
      </>
  );
}

export default App;