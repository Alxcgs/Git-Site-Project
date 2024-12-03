import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { authUser, loading } = useAuthContext();

    if (loading) {
        return null; // or a loading spinner
    }

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;