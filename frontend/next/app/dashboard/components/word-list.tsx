import { Word } from "@/app/types/word"
import Button from "design-system/components/Button"
import ListItem from "design-system/components/ListItem"
import Space from "design-system/components/Space"
import Text from "design-system/components/Text"
import Tooltip from "design-system/components/Tooltip"
import DeleteTwoTones from "design-system/icons/DeleteTwoTone"
import React from "react"

type Props = {
    word: Word;
    handleDelete: () => void;
}

const WordList: React.FC<Props> = ({ word, handleDelete }) => {
    return (
        <ListItem key={word.id} className="flex items-center justify-between">
            <Text>{word.word}</Text>
            <Tooltip title="Excluir palavra" color="red">
                <>
                    <Button
                        danger
                        type="text"
                        className="justify-end"
                        onClick={handleDelete}
                    >
                        {<DeleteTwoTones twoToneColor={'red'} className="text-lg"/>}
                    </Button>
                </>
            </Tooltip>
        </ListItem>
    );
};

export default WordList;