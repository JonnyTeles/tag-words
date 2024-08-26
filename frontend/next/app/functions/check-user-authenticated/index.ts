import { getCookie } from "cookies-next"
import {  useSession } from "next-auth/react";

/**
 * Verifica se o usuário está autenticado.
 * 
 * @returns {boolean} - Retorna `true` se o usuário estiver autenticado, `false` caso contrário.
 */
export const checkUserAuthenticated = (): boolean => {
    const { data: session } = useSession();
    const userToken = getCookie("jwt");

    return !!session && !!userToken;
}