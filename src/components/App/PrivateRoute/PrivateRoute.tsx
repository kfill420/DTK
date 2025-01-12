import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkTokenExpiration } from "../../../utils/checkTokenExpiration";
import { useAppDispatch } from "../../../hooks/redux";
import { actionLogOut } from "../../../store/reducer/account";

interface PrivateRouteProps {
    children: JSX.Element;
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
    const dispatch = useAppDispatch();
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    useEffect(() => {
        if (checkTokenExpiration() === false) {
            dispatch(actionLogOut());
            setShouldRedirect(true);
        }
    }, [dispatch]);

    if (shouldRedirect || !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};


const NonPrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
    return isAuthenticated ? <Navigate to="/" /> : children;
};

export { PrivateRoute, NonPrivateRoute };

