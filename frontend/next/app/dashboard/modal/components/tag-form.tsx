import Button from "design-system/components/Button";
import Card from "design-system/components/Card";
import Form from "design-system/components/Form";
import FormItem from "design-system/components/FormItem";
import Input from "design-system/components/Input";
import Title from "design-system/components/Title";

type Props = {
    onSubmit: (values: { tag: string }) => void;
    onCancel: () => void;
    isError: boolean;
}

const TagForm: React.FC<Props> = ({ onCancel, onSubmit, isError }) => {
    return (
        <Card className="w-full max-w-md" bordered={false}>
            <Title level={1} className="mb-4 text-center">Criar Tag</Title>
            <Form onFinish={onSubmit} layout="vertical">
                <FormItem
                    label="Tag"
                    name="tag"
                    validateStatus={isError ? 'error' : ''}
                    rules={[{ required: true, message: 'Por favor, insira uma tag!' }]}
                >
                    <Input required autoComplete='off' placeholder="Insira a tag..."  style={{ borderColor: isError ? 'red' : '' }}/>
                </FormItem>
                <div className="flex flex-col items-center">
                    <Button type="primary" htmlType="submit" className="w-full m-2">
                        Criar
                    </Button>
                    <Button type="default" onClick={onCancel} className="w-full">
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Card>
    )
}



export default TagForm