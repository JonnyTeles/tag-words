import { tag } from "./tag-interface";
import { user } from "./user-interface";
import { word } from "./word-interface";

export interface relation {
    id: string;
    wordId: string;
    tagId: string;
    userId: string;
    word?: Partial<word>;
    tag?: Partial<tag>;
    user?: Partial<user>;
}

export interface relationUpdate {
    id: string
    newTagId?: string;
    newWordId?: string;
    userId: string;
}

export interface relationCreate {
    wordId: string;
    tagId: string;
    userId: string;
}

export interface relactionServiceInterface {
    create(data: relationCreate): Promise<relation>;
    getAll(): Promise<relation[]>;
    getById(id: string): Promise<relation>
    update(data: relationUpdate): Promise<relation>;
    delete(id: string): Promise<void>;
}