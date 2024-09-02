import { useEffect, useMemo, useState } from "react";
import { getPaginatedItems, sortItemsAlphabetically } from "../utils/pagination";
import { Word } from "@/app/types/word";
import { Tag } from "@/app/types/tag";

export const usePagination = (word?: Word[], tag?: Tag[]) => {
    const [currentPageWords, setCurrentPageWords] = useState(1);
    const [currentPageTags, setCurrentPageTags] = useState(1);

    const sortedWords = useMemo(() => 
        Array.isArray(word) ? sortItemsAlphabetically(word) : [], 
        [word]
    );
    
    const sortedTags = useMemo(() => 
        Array.isArray(tag) ? sortItemsAlphabetically(tag) : [], 
        [tag]
    );

    const paginatedWords = useMemo(() => 
        getPaginatedItems(sortedWords, currentPageWords), 
        [sortedWords, currentPageWords]
    );
    
    const paginatedTags = useMemo(() => 
        getPaginatedItems(sortedTags, currentPageTags), 
        [sortedTags, currentPageTags]
    );

    useEffect(() => {
        const totalWords = sortedWords.length;
        const maxPageWords = Math.ceil(totalWords / 5);
        if (currentPageWords > maxPageWords) {
            setCurrentPageWords(maxPageWords || 1);
        }

        const totalTags = sortedTags.length;
        const maxPageTags = Math.ceil(totalTags / 5);
        if (currentPageTags > maxPageTags) {
            setCurrentPageTags(maxPageTags || 1);
        }
    }, [sortedWords, sortedTags, currentPageWords, currentPageTags]);

    const handleDeleteWordPagination = () => {
        const totalWords = sortedWords.length - 1;
        const maxPage = Math.ceil(totalWords / 5);
        if (currentPageWords > maxPage) {
            setCurrentPageWords(maxPage || 1);
        }
    };

    const handleDeleteTagPagination = () => {
        const totalTags = sortedTags.length - 1;
        const maxPage = Math.ceil(totalTags / 5);
        if (currentPageTags > maxPage) {
            setCurrentPageTags(maxPage || 1);
        }
    };

    const showWords = sortedWords.length > 0;
    const showTags = sortedTags.length > 0;

    return {
        showTags,
        showWords,
        currentPageTags,
        currentPageWords,
        sortedTags,
        sortedWords,
        paginatedTags,
        paginatedWords,
        setCurrentPageTags,
        setCurrentPageWords,
        handleDeleteWordPagination,
        handleDeleteTagPagination
    }
}