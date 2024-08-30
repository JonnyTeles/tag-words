import Button from "design-system/components/Button";
import Card from "design-system/components/Card";
import Form from "design-system/components/Form";
import FormItem from "design-system/components/FormItem";
import Input from "design-system/components/Input";
import Title from "design-system/components/Title";

type Props = {
    onSubmit: (values: { word: string }) => void;
    onCancel: () => void;
}

const WordForm: React.FC<Props> = ({ onCancel, onSubmit }) => (
    <Card className="w-full max-w-md shadow-lg">
        <Title level={1} className="mb-4 text-center">Criar Palavra</Title>
        <Form onFinish={onSubmit} layout="vertical">
            <FormItem
                label="Palavra"
                name="word"
                rules={[{ required: true, message: 'Por favor, insira uma palavra!' }]}
            >
                <Input required autoComplete='off' placeholder="Insira a palavra..." />
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

export default WordForm