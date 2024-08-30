import Button from "design-system/components/Button";

type Props = {
    onAddWord: () => void;
    onAddTag: () => void;
}

const UserActions: React.FC<Props> = ({ onAddWord, onAddTag }) => (
    <div className='flex items-center gap-2 m-2'>
        <Button type='link' onClick={onAddWord}>Adicionar Palavra</Button>
        <Button type='link' onClick={onAddTag}>Adicionar Tag</Button>
    </div>
);

export default UserActions;