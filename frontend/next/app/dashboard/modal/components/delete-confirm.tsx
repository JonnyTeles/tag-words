import Button from "design-system/components/Button";
import Card from "design-system/components/Card";
import Text from "design-system/components/Text";
import Title from "design-system/components/Title";

type Props = {
    onConfirm: (id: string) => void;
    onCancel: () => void;
    name: string;
    type: "palavra" | 'tag';
    id: string;
}

const DeleteConfirm: React.FC<Props> = ({ onCancel, onConfirm, name, type, id }) => {
    return (
        <Card className="w-full max-w-md" bordered={false}>
            <Title level={1} className="mb-4 text-center">Deletar {type}</Title>
            <Text className="text-lg">
                Deseja mesmo deletar a {type} &quot;{name}&quot;?
            </Text>
            <div className="flex flex-col items-center m-2">
                <Button type="primary" danger onClick={() => onConfirm(id)} className="w-full m-2">
                    deletar
                </Button>
                <Button type="default" onClick={onCancel} className="w-full">
                    Cancelar
                </Button>
            </div>
        </Card>
    )
}

export default DeleteConfirm