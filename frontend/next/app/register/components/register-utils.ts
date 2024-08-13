import { HttpClient } from "@/adapters/axios-adapter";
import { FormValues } from "../types/register-types";

export async function register(httpClient: HttpClient, values: FormValues) {
    return await httpClient.request({
        url: 'http://localhost:3333/users/create', //TODO - ADICIONAR ENV
        method: 'post',
        body: {
            name: values.name,
            email: values.email,
            password: values.password
        }
    });
}