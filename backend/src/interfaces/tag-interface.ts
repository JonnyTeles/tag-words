import { iUser } from "./user-interface";

export interface iTag {
    id: string;
    tag: string;
    users?: iUser;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    deleted: boolean;
} // TODO - AJEITAR ESSA INTERFACE COM TUDO DO BANCO