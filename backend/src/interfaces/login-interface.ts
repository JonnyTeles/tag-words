import { user } from "./user-interface";

export interface iLogin {
    email: string;
    password: string;
}

export interface loggedUser {
    user: Omit<user, 'password' | 'deletedAt' | 'deleted'>;
    token: string;
}

export interface LoginServiceInterface {
    login(data: iLogin): Promise<loggedUser>
}