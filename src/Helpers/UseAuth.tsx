import getCookie from "./GetCookie";
import {useMemo} from "react";

export default function UseAuth() {
    const jwt = getCookie('jwt_token');

    return useMemo(() => {
        return !!jwt;

    }, [jwt])
}