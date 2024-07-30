import { iTag } from "./tag-interface";
import { iWord } from "./word-interface";

export interface iUser {
    id: string;
    name: string;
    email: string;
    password: string;
    words?: iWord
    tags?: iTag;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    deleted: boolean;
    rolesId: number;
}

export interface iUserCreate {
    name: string;
    email: string;
    password: string;
}

export interface iUserService {
    create(data: iUserCreate): Promise<Partial<iUser>>;
}