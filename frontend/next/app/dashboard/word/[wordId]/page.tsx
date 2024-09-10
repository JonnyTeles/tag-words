"use client"
import Skeleton from "design-system/components/Skeleton"
import { useCustomWord } from "../hooks/useCustomWord"
import RelationModal from "../components/relation-modal"
import WordCard from "../components/word-card"

const WordPage: React.FC = () => {
    const { isWordLoading, word, tags, handleDeleteTag, handleBackDashboard, relationMutation, open, setOpen, error, setError } = useCustomWord();
    if (isWordLoading || !word?.body) return <Skeleton active />;

    const creationDate = word.body.created_at ? new Date(word.body.created_at).toLocaleDateString() : 'Data não disponível';

    const mappedTags: { id: string; tag: string }[] = word.body.Tag_Words.map((tagWord: { tag: { tag: string }; id: string }) => ({
        id: tagWord.id,
        tag: tagWord.tag.tag
    })) || [];

    const options = tags?.body?.map((tag: { tag: string; id: string }) => ({
        label: tag.tag,
        value: tag.id
    }));

    const defaultTagIds = word.body.Tag_Words.map((tagWord: { tagId: string }) => tagWord.tagId);

    const handleFinish = async (values: { tag: string[] }) => {
        relationMutation.mutate({ tagIds: values.tag, wordId: word?.body?.id })
    };

    return (
        <div className="mt-4 justify-center flex">
            <WordCard title={word?.body?.word}
                creationDate={creationDate}
                mappedTags={mappedTags}
                handleBackDashboard={handleBackDashboard}
                handleDeleteTag={handleDeleteTag}
                setOpen={() => setOpen(!open)} />
            <RelationModal
                word={word?.body?.word}
                open={open}
                options={options}
                defaultTagIds={defaultTagIds}
                setError={() => setError(false)}
                error={error}
                setOpen={() => setOpen(!open)}
                handleFinish={handleFinish} />
        </div>
    );
}

export default WordPage