import Card from 'design-system/components/Card';
import List from 'design-system/components/List';
import Title from 'design-system/components/Title';
import React, { FC } from 'react';
import WordList from './word-list';
import { Word } from '@/app/types/word';
import { Tag } from '@/app/types/tag';
import TagList from './tag-list';
import Text from 'design-system/components/Text';
import Empty from 'design-system/components/Empty';
import Button from 'design-system/components/Button';
import { useCustomDashboardHooks } from '../hooks/useCustomDashboard';
import PlusOutlined from 'design-system/icons/PlusOutlined';
import Space from 'design-system/components/Space';
import Tooltip from 'design-system/components/Tooltip';
import { usePagination } from '../hooks/usePagination';

type Props = {
    words?: Word[];
    tags?: Tag[];
    loading: boolean;
};

const ApiCard: FC<Props> = ({ words, tags, loading }) => {
    const { handleAddTag, handleAddWord, openDelete } = useCustomDashboardHooks()
    const { ...pagination } = usePagination(words, tags)

    return (
        <div className='flex items-stretch gap-2'>
            <Card className='flex-1'>
                <Title>Palavras</Title>
                {pagination.showWords ? (
                    <List
                        bordered
                        loading={loading}
                        pagination={{
                            position: 'bottom',
                            align: 'center',
                            pageSize: 5,
                            current: pagination.currentPageWords,
                            onChange: (page) => pagination.setCurrentPageWords(page),
                            total: pagination.sortedWords.length
                        }}
                    >
                        {pagination.paginatedWords.map((word) => (
                            <WordList key={word.id} word={word as Word} handleDelete={() => openDelete(word.id, word)} />
                        ))}
                        <Space align='center' className='flex justify-center py-4'>
                            <Tooltip title='Adicionar palavra'>
                                <>
                                    <Button size='large' icon={<PlusOutlined style={{ fontSize: 25 }} />} type='link' onClick={handleAddWord} />
                                </>
                            </Tooltip>
                        </Space>
                    </List>
                ) : (
                    <Empty
                        description={
                            <Text>Nenhuma Palavra Cadastrada</Text>
                        }
                    >
                        <Button type='link' onClick={handleAddWord}>Adicionar Palavra</Button>
                    </Empty>
                )}
            </Card>

            <Card className='flex-1'>
                <Title>Tags</Title>
                {pagination.showTags ? (
                    <List
                        bordered
                        loading={loading}
                        pagination={{
                            position: 'bottom',
                            align: 'center',
                            pageSize: 5,
                            current: pagination.currentPageTags,
                            onChange: (page) => pagination.setCurrentPageTags(page),
                            total: pagination.sortedTags.length
                        }}
                    >
                        {pagination.paginatedTags.map((tag) => (
                            <TagList key={tag.id} tag={tag as Tag} handleDelete={() => openDelete(tag.id, tag)} />
                        ))}
                        <Space align='center' className='flex justify-center py-4'>
                            <Tooltip title='Adicionar tag'>
                                <>
                                    <Button size='large' icon={<PlusOutlined style={{ fontSize: 25 }} />} type='link' onClick={handleAddTag} />
                                </>
                            </Tooltip>
                        </Space>
                    </List>
                ) : (
                    <Empty
                        description={
                            <Text>Nenhuma Tag Cadastrada</Text>
                        }
                    >
                        <Button type='link' onClick={handleAddTag}>Adicionar Tag</Button>
                    </Empty>
                )}
            </Card>
        </div>
    );
};

export default ApiCard;
