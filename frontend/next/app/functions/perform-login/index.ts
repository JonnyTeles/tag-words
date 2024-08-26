import { FormValues, LoginValues } from "@/app/register/types/register-types";
import { signIn } from "next-auth/react";
import { handleErrorNotification } from "../handle-error-notification";

/**
 * Tenta realizar o login com as credenciais fornecidas.
 * 
 * @param {FormValues | LoginValues} values - Dados de login contendo email e senha.
 * @returns {Promise<boolean>} - Retorna `true` se o login for bem-sucedido, `false` caso contrário.
 */
export const performLogin = async (values: FormValues | LoginValues): Promise<boolean> => {
    const { email, password } = values;
    const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
    });

    if (result?.error) {
        handleErrorNotification(result.error, 'Erro ao realizar login!');
        return false;
    }
    return true;
};
