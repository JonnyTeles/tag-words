import Button from "design-system/components/Button"
import Card from "design-system/components/Card"
import Empty from "design-system/components/Empty"
import List from "design-system/components/List"
import ListItem from "design-system/components/ListItem"
import Text from "design-system/components/Text"
import Title from "design-system/components/Title"
import Tooltip from "design-system/components/Tooltip"
import DeleteTwoTones from "design-system/icons/DeleteTwoTone"
import PlusOutlined from "design-system/icons/PlusOutlined"
import { useCustomWordContext } from "../provider/custom-word-context"

type Props = {
    title: string;
    creationDate: string;
    mappedTags: {
        id: string;
        tag: string;
    }[];
}

const WordCard: React.FC<Props> = ({ creationDate, mappedTags, title }) => {
    const { setOpen, handleBackDashboard, handleDeleteTag } = useCustomWordContext();
    return (
        <Card
            title={<Title level={1} className="text-center m-2 !text-blue-500">{title}</Title>}
            className="w-full max-w-sm"
            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
            <Text className="block mb-4">Data de Criação: {creationDate}</Text>
            {mappedTags?.length > 0 ? (
                <List
                    header={<Title level={3} className="text-center m-2 !text-blue-500">Tags Associadas</Title>}
                    bordered
                    dataSource={mappedTags}
                    pagination={{
                        position: 'bottom',
                        align: 'center',
                        pageSize: 5
                    }}
                    renderItem={tag => (
                        <ListItem className="text-gray-700">
                            <Text>{tag.tag}</Text>
                            <Tooltip title='Excluir relação' color='red'>
                                <>
                                    <Button
                                        danger
                                        type="text"
                                        className="justify-end"
                                        onClick={() => handleDeleteTag(tag.id)}
                                    >
                                        <DeleteTwoTones twoToneColor={'red'} className="text-lg" />
                                    </Button>
                                </>
                            </Tooltip>
                        </ListItem>
                    )}
                />
            ) : (
                <Empty description="Nenhuma tag associada" />
            )}
            <div className="flex flex-col items-center mt-2 gap-2">
                <Tooltip title={'Adicionar uma tag a essa palavra'}>
                    <>
                        <Button onClick={() => setOpen(true)} size='large' icon={<PlusOutlined style={{ fontSize: 25 }} />} type='link' />
                    </>
                </Tooltip>
                <Button onClick={handleBackDashboard}>Voltar</Button>
            </div>
        </Card>
    )
}

export default WordCard