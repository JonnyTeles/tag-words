import { APP_ROUTES } from "@/app/constants/app-routes"

/**
 * Verifica se o caminho da rota fornecido é uma rota pública.
 * 
 * @param {string} asPath - O caminho da rota a ser verificado.
 * @returns {boolean} - Retorna `true` se a rota for pública, `false` caso contrário.
 */
export const checkIsPublicRoute = (asPath: string): boolean => {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.includes(asPath);
}