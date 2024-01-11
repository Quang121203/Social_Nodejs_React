import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user ? children : (<Navigate to="/login" />)}
        </>

    );
}

export default PrivateRoute