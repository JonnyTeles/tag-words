import React, { FC } from 'react';
import { Word } from '@/app/types/word';
import { Tag } from '@/app/types/tag';
import TagList from './tag-list';
import WordList from './word-list';

type Props = {
    words?: Word[];
    tags?: Tag[];
    loading: boolean;
};

const ApiCard: FC<Props> = ({ words, tags, loading }) => {

    return (
        <div className='flex items-stretch gap-2'>
            <WordList loading={loading} tags={tags} words={words} />
            <TagList loading={loading} tags={tags} words={words} />
        </div>
    );
};

export default ApiCard;
