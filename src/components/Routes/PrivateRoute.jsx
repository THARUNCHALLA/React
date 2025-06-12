import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
    const { userDetails } = useAuth();

    return userDetails ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
