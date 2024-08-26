import { getCookie } from "cookies-next"

/**
 * Verifica se o usuário está autenticado.
 * 
 * @returns {boolean} - Retorna `true` se o usuário estiver autenticado, `false` caso contrário.
 */
export const checkUserAuthenticated = (): boolean => {
    const userToken = getCookie("jwt");

    return !!userToken;
}