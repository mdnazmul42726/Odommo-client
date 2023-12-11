import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "./components/Loding";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && user) {
        return children
    }

    return <Navigate to={'/login'} />

};

export default PrivateRoute;