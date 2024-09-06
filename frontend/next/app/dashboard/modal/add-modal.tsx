"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from 'design-system/components/Modal';
import { useEffect, useState } from 'react';
import TagForm from './components/tag-form';
import WordForm from './components/word-form';
import { useCustomDashboard } from '../hooks/useCustomDashboard';

const AddModal: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [params, setParams] = useState<string | null>(null);
    const {error, tagMutation, wordMutation} = useCustomDashboard()

    useEffect(() => {
        const search = searchParams.get('add');
        setParams(search === 'tag' || search === 'word' ? search : null)
    }, [searchParams]);

    const handleCancel = () => {
        router.push('/dashboard');
    };

    const handleTagSubmit = (values: { tag: string }) => {
        tagMutation.mutate(values);
    };

    const handleWordSubmit = (values: { word: string }) => {
        wordMutation.mutate(values);
    };

    return (
        <>
            <Modal
                open={true}
                onCancel={handleCancel}
                footer={false}
            >
                {params === 'tag' ? (
                    <TagForm onSubmit={handleTagSubmit} onCancel={handleCancel} isError={error} />
                ) : params === 'word' ? (
                    <WordForm onSubmit={handleWordSubmit} onCancel={handleCancel} isError={error}/>
                ) : null}
            </Modal>
        </>
    );
};

export default AddModal;
