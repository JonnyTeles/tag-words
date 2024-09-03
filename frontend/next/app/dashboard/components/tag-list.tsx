import { Tag } from "@/app/types/tag"
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
import { useCustomDashboardHooks } from "../hooks/useCustomDashboard"
import { usePagination } from "../hooks/usePagination"

type Props = {
    words?: Word[];
    tags?: Tag[];
    loading: boolean;
}

const TagList: React.FC<Props> = ({ tags, words, loading }) => {
    const { handleAddTag, openDelete } = useCustomDashboardHooks();
    const pagination = usePagination(words, tags);

    const showEmptyStateTags = !pagination.searchTermTags && (tags === undefined || tags.length === 0);
    const showNotFoundTags = pagination.searchTermTags && pagination.filteredTags.length === 0;

    return (
        <Card className='flex-1'>
            <Title>Tags</Title>
            <Input
                placeholder="Pesquisar tags"
                onChange={(e) => pagination.setSearchTermTags(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            {showEmptyStateTags ? (
                <Empty
                    description={<Text>Nenhuma Tag Cadastrada</Text>}
                >
                    <Button type='link' onClick={handleAddTag}>Adicionar Tag</Button>
                </Empty>
            ) : showNotFoundTags ? (
                <Empty
                    description={<Text>Tag {pagination.searchTermTags} não encontrada</Text>}
                >
                    <Button type='link' onClick={handleAddTag}>Adicionar Tag</Button>
                </Empty>
            ) : (
                <List
                    bordered
                    loading={loading}
                    pagination={{
                        position: 'bottom',
                        align: 'center',
                        pageSize: 5,
                        current: pagination.currentPageTags,
                        onChange: (page) => pagination.setCurrentPageTags(page),
                        total: pagination.filteredTags.length
                    }}
                >
                    {pagination.paginatedTags.map((tag: any) => (
                        <ListItem key={tag.id} className="flex items-center justify-between">
                            <Text>{tag.tag}</Text>
                            <Tooltip title='Excluir tag' color='red'>
                                <Button
                                    danger
                                    type="text"
                                    className="justify-end"
                                    onClick={() => openDelete(tag.id, tag)}
                                >
                                    <DeleteTwoTones twoToneColor={'red'} className="text-lg" />
                                </Button>
                            </Tooltip>
                        </ListItem>
                    ))}
                    <Space align='center' className='flex justify-center py-4'>
                        <Tooltip title='Adicionar tag'>
                            <Button size='large' icon={<PlusOutlined style={{ fontSize: 25 }} />} type='link' onClick={handleAddTag} />
                        </Tooltip>
                    </Space>
                </List>
            )}
        </Card>
    )
}

export default TagList