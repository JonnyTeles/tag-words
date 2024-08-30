import Card from 'design-system/components/Card';
import List from 'design-system/components/List';
import Title from 'design-system/components/Title';
import React, { FC, useEffect, useState } from 'react';
import WordList from './word-list';
import { Word } from '@/app/types/word';
import { Tag } from '@/app/types/tag';
import TagList from './tag-list';
import { getPaginatedItems, sortItemsAlphabetically } from '../utils/pagination';
import Text from 'design-system/components/Text';

type Props = {
    words?: Word[];
    tags?: Tag[];
    loading: boolean;
    delete: {
        deleteTags: (id: string) => void;
        deleteWords: (id: string) => void;
    };
};

const ApiCard: FC<Props> = ({ words, tags, loading, delete: { deleteTags, deleteWords } }) => {
    const [currentPageWords, setCurrentPageWords] = useState(1);
    const [currentPageTags, setCurrentPageTags] = useState(1);

    const sortedWords = sortItemsAlphabetically(words || []);
    const sortedTags = sortItemsAlphabetically(tags || []);

    const paginatedWords = getPaginatedItems(sortedWords, currentPageWords);
    const paginatedTags = getPaginatedItems(sortedTags, currentPageTags);

    useEffect(() => {
        if (sortedWords.length === 0 && currentPageWords > 1) {
            setCurrentPageWords(currentPageWords - 1);
        }
        if (sortedTags.length === 0 && currentPageTags > 1) {
            setCurrentPageTags(currentPageTags - 1);
        }
    }, [sortedWords, sortedTags, currentPageWords, currentPageTags]);

    const handleDeleteWord = (wordId: string) => {
        deleteWords(wordId);
        const totalWords = sortedWords.length - 1;
        const maxPage = Math.ceil(totalWords / 5);
        if (currentPageWords > maxPage) {
            setCurrentPageWords(maxPage || 1);
        }
    };

    const handleDeleteTag = (tagId: string) => {
        deleteTags(tagId);
        const totalTags = sortedTags.length - 1;
        const maxPage = Math.ceil(totalTags / 5);
        if (currentPageTags > maxPage) {
            setCurrentPageTags(maxPage || 1);
        }
    };

    const showWords = sortedWords.length > 0;
    const showTags = sortedTags.length > 0;

    return (
        <div className='flex items-stretch gap-2'>
            <Card className='flex-1'>
                <Title>Palavras</Title>
                {showWords ? (
                    <List
                        bordered
                        loading={loading}
                        pagination={{
                            position: 'bottom',
                            align: 'center',
                            pageSize: 5,
                            current: currentPageWords,
                            onChange: (page) => setCurrentPageWords(page),
                            total: sortedWords.length
                        }}
                    >
                        {paginatedWords.map((word) => (
                            <WordList key={word.id} word={word as Word} handleDelete={() => handleDeleteWord(word.id)} />
                        ))}
                    </List>
                ) : (
                    <Text>Nenhuma Palavra Cadastrada</Text>
                )}
            </Card>

            <Card className='flex-1'>
                <Title>Tags</Title>
                {showTags ? (
                    <List
                        bordered
                        loading={loading}
                        pagination={{
                            position: 'bottom',
                            align: 'center',
                            pageSize: 5,
                            current: currentPageTags,
                            onChange: (page) => setCurrentPageTags(page),
                            total: sortedTags.length
                        }}
                    >
                        {paginatedTags.map((tag) => (
                            <TagList key={tag.id} tag={tag as Tag} handleDelete={() => handleDeleteTag(tag.id)} />
                        ))}
                    </List>
                ) : (
                    <Text>Nenhuma Tag Cadastrada</Text>
                )}
            </Card>
        </div>
    );
};

export default ApiCard;
