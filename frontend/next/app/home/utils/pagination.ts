import { Tag } from "@/app/types/tag";
import { Word } from "@/app/types/word";

const isWord = (item: Word | Tag): item is Word => 'word' in item;

export const sortItemsAlphabetically = (items: (Word | Tag)[]) => {
    return items.slice().sort((a, b) => {
        const aValue = isWord(a) ? a.word : a.tag;
        const bValue = isWord(b) ? b.word : b.tag;
        return aValue.localeCompare(bValue);
    });
};

export const getPaginatedItems = (items: (Word | Tag)[], currentPage: number) => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    return items.slice(startIndex, endIndex);
};

