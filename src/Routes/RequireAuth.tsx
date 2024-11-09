import {Navigate, useLocation} from "react-router-dom";
import UseAuth from "../Helpers/UseAuth";

export default function RequireAuth({children}: { children: JSX.Element }) {
    const location = useLocation();
    const isAuthenticated = UseAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }


    return children;
}