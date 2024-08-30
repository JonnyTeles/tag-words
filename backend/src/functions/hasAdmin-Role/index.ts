import { prisma } from "../../prisma/client";

/**
 * Verifica se o usuário é um administrador.
 * 
 * 
 * @param {string} userId - O ID do usuário a ser verificado.
 * @returns {Promise<boolean>} - `true` se o usuário for um administrador, ou `false` se não for.
 */
export async function hasAdminRole(userId: string): Promise<boolean> {
    const user = await prisma.users.findUnique({
        where: { id: userId }
    })

    return user?.rolesId === 2;
}