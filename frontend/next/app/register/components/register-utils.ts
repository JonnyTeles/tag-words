import { HttpClient } from "@/app/adapters/axios-adapter";
import { FormValues, LoginValues } from "../types/register-types";

export async function register(httpClient: HttpClient, values: FormValues) {
    return await httpClient.request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/create`,
        method: 'post',
        body: {
            name: values.name,
            email: values.email,
            password: values.password
        }
    });
}

export async function login(httpClient: HttpClient, values: LoginValues) {
    try {
        const response = await httpClient.request({
            url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
            method: 'post',
            body: {
                email: values.email,
                password: values.password
            },
            headers: { "Content-Type": "application/json" }
        });
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
