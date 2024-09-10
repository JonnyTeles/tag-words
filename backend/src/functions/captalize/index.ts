/**
 * Capitaliza a primeira letra de cada palavra em uma string.
 *
 * @param {string} str - A string de entrada a ser capitalizada.
 * @returns {string} A string com a primeira letra de cada palavra capitalizada.
 */
export const capitalizeWords = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};