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

export interface tagCreate {
    tag: string;
    userId: string;
}

export interface tagUpdate {
    id: string;
    tag: string;
}

export interface tagServiceCreate {
    create(data: tagCreate): Promise<tag>;
    getAll(): Promise<tag[]>;
    getById(id: string): Promise<tag>;
    getByName(name: string): Promise<tag>;
    getAllDeleted(): Promise<tag[]>;
    update(data: tagUpdate): Promise<tag>;
    delete(id: string): Promise<void>;
}                                                        