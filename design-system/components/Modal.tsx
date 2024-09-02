import { Modal as BaseModal, ModalProps } from 'antd';
import { PropsWithChildren } from 'react';

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children, ...props }) => (
    <BaseModal {...props}>
        {children}
    </BaseModal>
)

export default Modal;
