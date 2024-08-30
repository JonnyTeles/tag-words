import { Tag } from "@/app/types/tag"
import Button from "design-system/components/Button"
import ListItem from "design-system/components/ListItem"
import Text from "design-system/components/Text"
import Tooltip from "design-system/components/Tooltip"
type Props = {
    tag: Tag;
    handleDelete: () => void;
}

const TagList: React.FC<Props> = ({ tag, handleDelete }) => (
    <ListItem key={tag.id} className="flex items-center justify-between">
        <Text>{tag.tag}</Text>
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

export default TagList