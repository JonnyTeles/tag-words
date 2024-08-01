import { user } from "../interfaces/user-interface";

declare global {
    namespace Express {
        export interface Request {
            user: Omit<user, 'password'>
        }
    }
}