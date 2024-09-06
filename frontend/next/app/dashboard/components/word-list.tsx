import { Word } from "@/app/types/word"
import Button from "design-system/components/Button"
import Card from "design-system/components/Card"
import Empty from "design-system/components/Empty"
import Input from "design-system/components/Input"
import List from "design-system/components/List"
import ListItem from "design-system/components/ListItem"
import Space from "design-system/components/Space"
import Text from "design-system/components/Text"
import Title from "design-system/components/Title"
import Tooltip from "design-system/components/Tooltip"
import DeleteTwoTones from "design-system/icons/DeleteTwoTone"
import PlusOutlined from "design-system/icons/PlusOutlined"
import React from "react"

import { usePagination } from "../hooks/usePagination"
import { Tag } from "@/app/types/tag"
import { useRouter } from "next/navigation"
import { useCustomDashboard } from "../hooks/useCustomDashboard"
import Link from "design-system/components/Link"

type Props = {
    words?: Word[];
    tags?: Tag[];
    loading: boolean;
}

const WordList: React.FC<Props> = ({ words, tags, loading }) => {
    const router = useRouter()
    const { handleAddWord, openDelete } = useCustomDashboard();
    const pagination = usePagination(words, tags);

    const showEmptyStateWords = !pagination.searchTermWords && (words === undefined || words.length === 0);
    const showNotFoundWords = pagination.searchTermWords && pagination.filteredWords.length === 0;

    const handleWordPage = (id: string) => {
        router.push(`/dashboard/word/${id}`)
    }

    return (
        <Card className='flex-1'>
            <Title>Palavras</Title>
            <Input
                placeholder="Pesquisar palavras"
                onChange={(e) => pagination.setSearchTermWords(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            {showEmptyStateWords ? (
                <Empty
                    description={<Text>Nenhuma Palavra Cadastrada</Text>}
                >
                    <Button type='link' onClick={handleAddWord}>Adicionar Palavra</Button>
                </Empty>
            ) : showNotFoundWords ? (
                <Empty
                    description={<Text>Palavra {pagination.searchTermWords} não encontrada</Text>}
                >
                    <Button type='link' onClick={handleAddWord}>Adicionar Palavra</Button>
                </Empty>
            ) : (
                <List
                    bordered
                    loading={loading}
                    pagination={{
                        position: 'bottom',
                        align: 'center',
                        pageSize: 5,
                        current: pagination.currentPageWords,
                        onChange: (page) => pagination.setCurrentPageWords(page),
                        total: pagination.filteredWords.length
                    }}
                >
                    {pagination.paginatedWords.map((word: any) => (
                        <ListItem key={word.id} className="flex items-center justify-between">
                            <Link onClick={() => handleWordPage(word.id)}>{word.word}</Link>
                            <Tooltip title='Excluir palavra' color='red'>
                                <>
                                    <Button
                                        danger
                                        type="text"
                                        className="justify-end"
                                        onClick={() => openDelete(word.id, word)}
                                    >
                                        <DeleteTwoTones twoToneColor={'red'} className="text-lg" />
                                    </Button>
                                </>
                            </Tooltip>
                        </ListItem>
                    ))}
                    <Space align='center' className='flex justify-center py-4'>
                        <Tooltip title='Adicionar palavra'>
                            <>
                                <Button size='large' icon={<PlusOutlined style={{ fontSize: 25 }} />} type='link' onClick={handleAddWord} />
                            </>
                        </Tooltip>
                    </Space>
                </List>
            )}
        </Card>
    );
};

export default WordList;