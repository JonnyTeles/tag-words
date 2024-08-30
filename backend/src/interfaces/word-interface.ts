import { user } from "./user-interface";

export interface word {
    id: string;
    word: string;
    users?: user;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    deleted: boolean
} // TODO - AJEITAR ESSA INTERFACE COM TUDO DO BANCO

export interface wordCreate {
    word: string;
    userId: string;
}

export interface wordUpdate {
    id: string;
    word: string;
}

export interface wordServiceInterface {
    create(data: wordCreate): Promise<word>;
    getAll(): Promise<word[]>;
    getYours(userId: string): Promise<word[]>;
    getById(id: string): Promise<word>;
    getByName(name: string): Promise<word>;
    getAllDeleted(): Promise<word[]>;
    update(data: wordUpdate): Promise<word>;
    delete(id: string): Promise<void>;
}                                                        