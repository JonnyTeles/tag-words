import { iUser } from "./user-interface";

export interface iWord {
    id: string;
    word: string;
    users?: iUser;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    deleted: boolean
} // TODO - AJEITAR ESSA INTERFACE COM TUDO DO BANCO

export interface iWordCreate {
    word: string;
    userId: string;
}

export interface iWordService {
    create(data: iWordCreate): Promise<iWord>;
    getAll(): Promise<iWord[]>;
    getById(id: string): Promise<iWord>;
    getByName(name: string): Promise<iWord>;
    getAllDeleted(): Promise<iWord[]>;
    delete(id: string): Promise<void>;
}                                                        