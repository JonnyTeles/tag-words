"use client"
import Modal from 'design-system/components/Modal';
import { useCustomDashboardHooks } from '../hooks/useCustomDashboard';
import DeleteConfirm from './components/delete-confirm';
import { useCustomDeleteHooks } from '../hooks/useCustomDeleteHooks';

const DeleteModal: React.FC = () => {
    const { handleDeleteTag, handleDeleteWord } = useCustomDashboardHooks()
    const { handleCancel, id, name, params } = useCustomDeleteHooks()

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
