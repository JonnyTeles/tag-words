import { AxiosHttpClientAdapter } from "@/app/adapters/axios-adapter";
import { login } from "@/app/register/components/register-utils";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
const httpClient = new AxiosHttpClientAdapter();

const handler = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (!credentials) return null
                try {
                    const response = await login(httpClient, credentials)
                    console.log(response.statusCode)
                    if (response.statusCode !== 200) {
                        throw new Error(response.body.message || "Erro desconhecido")
                    }
                    const authData = response.body
                    cookies().set("jwt", authData.token)
                    return {
                        id: authData.user.id,
                        email: authData.user.email,
                        name: authData.user.name
                    }
                } catch (error: any) {
                    console.log(error.message)
                    throw new Error(error.message || "Erro interno no servidor")
                }
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET
})

export { handler as GET, handler as POST }