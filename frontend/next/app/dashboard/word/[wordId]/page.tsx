"use client"
import Skeleton from "design-system/components/Skeleton"
import RelationModal from "../components/relation-modal"
import WordCard from "../components/word-card"
import { useCustomWordContext } from "../provider/custom-word-context"

const WordPage: React.FC = () => {
    const { isWordLoading, word, tags, relationMutation } = useCustomWordContext();
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
            />
            <RelationModal
                word={word?.body?.word}
                options={options}
                defaultTagIds={defaultTagIds}
                handleFinish={handleFinish} />
        </div>
    );
}

export default WordPage