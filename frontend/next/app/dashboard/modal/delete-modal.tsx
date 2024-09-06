"use client"
import Modal from 'design-system/components/Modal';
import DeleteConfirm from './components/delete-confirm';
import { useCustomDelete } from '../hooks/useCustomDelete';
import { useCustomDashboard } from '../hooks/useCustomDashboard';

const DeleteModal: React.FC = () => {
    const { handleDeleteTag, handleDeleteWord } = useCustomDashboard()
    const { handleCancel, id, name, params } = useCustomDelete()

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
