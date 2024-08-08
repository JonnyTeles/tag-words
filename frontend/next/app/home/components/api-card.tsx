import React, { FC } from 'react';

export type Word = {
    id: string;
    word: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    deleted: boolean;
    usersId: string;
};

export type Tag = {
    id: string;
    tag: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    deleted: boolean;
    usersId: string;
};

type Props = {
    words: Word[];
    tags: Tag[];
};

const ApiCard: FC<Props> = ({ words, tags }) => {

    console.log(words)
    const wordList = words.map((word) => (
        <li key={word.id}>{word.word}</li>
    ));

    const tagList = tags.map((tag) => (
        <li key={tag.id}>{tag.tag}</li>
    ));

    return (
        <div>
            <div>
                <h3 className='bg-red-500'>Words</h3>
                <ul>
                    {wordList}
                </ul>
            </div>
            <div>
                <h3 className='bg-red-500'>Tags</h3>
                <ul>
                    {tagList}
                </ul>
            </div>
        </div>
    );
};

export default ApiCard;
