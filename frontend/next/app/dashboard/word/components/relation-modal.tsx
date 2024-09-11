import Button from "design-system/components/Button"
import Card from "design-system/components/Card"
import Form from "design-system/components/Form"
import FormItem from "design-system/components/FormItem"
import Modal from "design-system/components/Modal"
import Select from "design-system/components/Select"
import Title from "design-system/components/Title"
import { useCustomWordContext } from "../provider/custom-word-context"

type Props = {
    word: string;
    handleFinish: (values: { tag: string[] }) => void;
    options: { label: string; value: string }[];
    defaultTagIds: string[];
}

const RelationModal: React.FC<Props> = ({ word, defaultTagIds, handleFinish, options }) => {
    const { open, setOpen, error, setError } = useCustomWordContext();
    return (
        <Modal open={open} footer={false} afterClose={() => setError(false)}>
            <Card className="w-full max-w-md" bordered={false}>
                <Title level={2} className="mb-4 text-center">Adicionar tag a <span className="text-blue-500">{word}</span></Title>
                <Form layout="vertical" onFinish={handleFinish}>
                    <FormItem
                        label="Tag"
                        name="tag"
                        validateStatus={error ? 'error' : ''}
                        rules={[{ required: true, message: 'Por favor, insira uma tag!' }]}
                    >
                        <Select mode="tags" placeholder='Tags' options={options} defaultValue={defaultTagIds} allowClear style={{ borderColor: error ? 'red' : '' }} />
                    </FormItem>
                    <div className="flex flex-col items-center">
                        <Button type="primary" htmlType="submit" className="w-full m-2">
                            Criar
                        </Button>
                        <Button type="default" onClick={() => setOpen(false)} className="w-full">
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card>
        </Modal>
    )
}

export default RelationModal