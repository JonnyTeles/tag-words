import { iUser } from "./user-interface";

export interface iLogin {
    email: string;
    password: string;
}

export interface iLoggedUser {
    user: Omit<iUser, 'password'>;
    token: string;
}

export interface iLoginService {
    login(data: iLogin): Promise<iLoggedUser>
}