"use client"
import Skeleton from "design-system/components/Skeleton"
import { useCustomWord } from "../hooks/useCustomWord"
import Card from "design-system/components/Card"
import Text from "design-system/components/Text"
import Button from "design-system/components/Button"
import List from "design-system/components/List"
import ListItem from "design-system/components/ListItem"
import Tooltip from "design-system/components/Tooltip"
import DeleteTwoTones from "design-system/icons/DeleteTwoTone"
import PlusOutlined from "design-system/icons/PlusOutlined"
import Modal from "design-system/components/Modal"
import Title from "design-system/components/Title"
import Form from "design-system/components/Form"
import FormItem from "design-system/components/FormItem"
import Select from "design-system/components/Select"

const WordPage: React.FC = () => {
    const { isWordLoading, word, tags, handleDeleteTag, handleBackDashboard, relationMutation, open, setOpen } = useCustomWord();
    if (isWordLoading || !word?.body) return <Skeleton active />;

    const creationDate = word.body.created_at ? new Date(word.body.created_at).toLocaleDateString() : 'Data não disponível';

    const mappedTags: { id: string; tag: string }[] = word.body.Tag_Words.map((tagWord: { tag: { tag: string }; id: string }) => ({
        id: tagWord.id,
        tag: tagWord.tag.tag
    })) || [];

    const options = tags?.body?.map((tag: { tag: string; id: string }) => ({
        label: tag.tag,
        value: tag.id
    }));

    const defaultTagIds = word.body.Tag_Words.map((tagWord: { tagId: string }) => tagWord.tagId);

    const handleFinish = async (values: { tag: string[] }) => {
        relationMutation.mutate({ tagIds: values.tag, wordId: word?.body?.id })
    };

    //TODO - AJEITAR MODAL - QUEBRAR ESSE COMPONENTE
    return (
        <div className="mt-4 justify-center flex">
            <Card
                title={word?.body?.word}
                className="w-full max-w-sm"
                style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <Text className="block mb-2">Data de Criação: {creationDate}</Text>
                {mappedTags?.length > 0 ? (
                    <List
                        header={<Text className="font-semibold">Tags:</Text>}
                        bordered
                        dataSource={mappedTags}
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
                    <Text className="text-gray-500">Nenhuma tag associada</Text>
                )}
                <div className="flex flex-col items-center mt-2 gap-2">
                    <Tooltip title={'Adicionar uma tag a essa palavra'}>
                        <>
                            <Button onClick={() => setOpen(!open)} size='large' icon={<PlusOutlined style={{ fontSize: 25 }} />} type='link' />
                        </>
                    </Tooltip>
                    <Button onClick={handleBackDashboard}>Voltar</Button>
                </div>
            </Card>




            <Modal open={open} footer={false}>
                <Card className="w-full max-w-md" bordered={false}>
                    <Title level={1} className="mb-4 text-center">Adicionar tag a palavra</Title>
                    <Form layout="vertical" onFinish={handleFinish}>
                        <FormItem
                            label="Tag"
                            name="tag"
                            rules={[{ required: true, message: 'Por favor, insira uma tag!' }]}
                        >
                            <Select mode="tags" placeholder='Tags' options={options} defaultValue={defaultTagIds} />
                        </FormItem>
                        <div className="flex flex-col items-center">
                            <Button type="primary" htmlType="submit" className="w-full m-2">
                                Criar
                            </Button>
                            <Button type="default" onClick={() => setOpen(!open)} className="w-full">
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Modal>




        </div>
    );
}

export default WordPage