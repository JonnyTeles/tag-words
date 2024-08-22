import { getCookie } from "cookies-next"
import {  useSession } from "next-auth/react";

/**
 * 
 * @returns boolean
 */
export const checkUserAuthenticated = () => {

    const { data: session } = useSession();
    const userToken = getCookie("jwt");

    return !!session && !!userToken;
}