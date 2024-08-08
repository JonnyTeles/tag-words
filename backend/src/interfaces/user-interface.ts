import { tag } from "./tag-interface";
import { word } from "./word-interface";

export interface user {
    id: string;
    name: string;
    email: string;
    password: string;
    words?: word
    tags?: tag;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    deleted: boolean;
    rolesId: number;
}

export interface userCreate {
    name: string;
    email: string;
    password: string;
}

export interface userServiceInterface {
    create(data: userCreate): Promise<Partial<user>>;
    createAdmin(data: userCreate): Promise<Partial<user>>;
}