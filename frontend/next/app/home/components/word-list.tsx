import { Word } from "@/app/types/word"
import Button from "design-system/components/Button"
import ListItem from "design-system/components/ListItem"
import Text from "design-system/components/Text"
import Tooltip from "design-system/components/Tooltip"
type Props = {
    word: Word;
    handleDelete: () => void;
}

const WordList: React.FC<Props> = ({word, handleDelete}) => (
    <ListItem key={word.id} className="flex items-center justify-between">
        <Text>{word.word}</Text>
        <Tooltip title='Excluir palavra' color='red'>
            <Button
                danger
                type='text'
                className="justify-end"
                onClick={handleDelete}>
                X
            </Button>
        </Tooltip>
    </ListItem>
)

export default WordList