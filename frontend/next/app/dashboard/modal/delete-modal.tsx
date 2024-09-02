"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from 'design-system/components/Modal';
import { useEffect, useState } from 'react';
import { useCustomDashboardHooks } from '../hooks/useCustomDashboard';
import DeleteConfirm from './components/delete-confirm';

const DeleteModal: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [params, setParams] = useState<string | null>(null);
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const { handleDeleteTag, handleDeleteWord } = useCustomDashboardHooks()

    useEffect(() => {
        const search = searchParams.get('delete');
        const id = searchParams.get('id') || '';
        const name = searchParams.get('name') || '';
        const decodedId = decodeURIComponent(id) || ''
        setParams(search === 'tag' || search === 'word' ? search : null)
        setId(decodedId)
        setName(name)
    }, [searchParams]);

    const handleCancel = () => {
        router.push('/dashboard');
    };
    return (
        <>
            <Modal
                open={true}
                onCancel={handleCancel}
                footer={false}
            >
                {params === 'tag' ? (
                    <DeleteConfirm id={id} name={name} onCancel={handleCancel} onConfirm={() => handleDeleteTag(id)} type='tag' />
                ) : params === 'word' ? (
                    <DeleteConfirm id={id} name={name} onCancel={handleCancel} onConfirm={() => handleDeleteWord(id)} type='palavra' />
                ) : null}
            </Modal>
        </>
    );
};

export default DeleteModal;
