import { useEffect, useMemo, useState } from "react";
import { getPaginatedItems, sortItemsAlphabetically } from "../utils/pagination";
import { Word } from "@/app/types/word";
import { Tag } from "@/app/types/tag";

export const usePagination = (words?: Word[], tags?: Tag[]) => {
    const [currentPageWords, setCurrentPageWords] = useState(1);
    const [currentPageTags, setCurrentPageTags] = useState(1);

    const sortedWords = useMemo(() =>
        Array.isArray(words) ? sortItemsAlphabetically(words) : [],
        [words]
    );

    const sortedTags = useMemo(() =>
        Array.isArray(tags) ? sortItemsAlphabetically(tags) : [],
        [tags]
    );

    const [searchTermWords, setSearchTermWords] = useState('');
    const [searchTermTags, setSearchTermTags] = useState('');

    const filteredWords = useMemo(() =>
        sortedWords.filter(word =>
            //@ts-ignore
            word.word.toLowerCase().includes(searchTermWords.toLowerCase())
        ),
        [sortedWords, searchTermWords]
    );
    //TODO - Ajeitar tipagem
    const filteredTags = useMemo(() =>
        sortedTags.filter(tag =>
            //@ts-ignore
            tag.tag.toLowerCase().includes(searchTermTags.toLowerCase())
        ),
        [sortedTags, searchTermTags]
    );

    const paginatedWords = useMemo(() =>
        getPaginatedItems(filteredWords, currentPageWords),
        [filteredWords, currentPageWords]
    );

    const paginatedTags = useMemo(() =>
        getPaginatedItems(filteredTags, currentPageTags),
        [filteredTags, currentPageTags]
    );

    useEffect(() => {
        const totalWords = filteredWords.length;
        const maxPageWords = Math.ceil(totalWords / 5);
        if (currentPageWords > maxPageWords) {
            setCurrentPageWords(maxPageWords || 1);
        }

        const totalTags = filteredTags.length;
        const maxPageTags = Math.ceil(totalTags / 5);
        if (currentPageTags > maxPageTags) {
            setCurrentPageTags(maxPageTags || 1);
        }
    }, [filteredWords, filteredTags, currentPageWords, currentPageTags]);

    return {
        currentPageWords,
        currentPageTags,
        filteredWords,
        filteredTags,
        paginatedWords,
        paginatedTags,
        setCurrentPageWords,
        setCurrentPageTags,
        setSearchTermWords,
        setSearchTermTags,
        searchTermWords,
        searchTermTags,
    };
};
