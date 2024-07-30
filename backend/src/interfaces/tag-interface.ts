import { user } from "./user-interface";

export interface tag {
    id: string;
    tag: string;
    users?: user;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    deleted: boolean;
} // TODO - AJEITAR ESSA INTERFACE COM TUDO DO BANCO