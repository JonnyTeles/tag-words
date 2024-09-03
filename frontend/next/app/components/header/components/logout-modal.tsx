import Button from "design-system/components/Button";
import Modal from "design-system/components/Modal";
import Space from "design-system/components/Space";
import Text from "design-system/components/Text";

type Props = {
    open: boolean;
    handleModal: () => void;
    handleLogout: () => void;
}

const LogoutModal: React.FC<Props> = ({ handleModal, handleLogout, open }) => (
    <Modal
        title="Confirmar logout"
        open={open}
        onCancel={handleModal}
        footer={null}
        centered
    >
        <Space align="center" direction="vertical" className="w-full mt-2">
            <Text strong className="text-lg">Deseja mesmo fazer sair?</Text>
            <div className="flex w-full items-center m-2 gap-2">
                <Button type="primary" onClick={handleLogout} className="w-full">Sair</Button>
                <Button onClick={handleModal} className="w-full">Cancelar</Button>
            </div>
        </Space>
    </Modal>

)

export default LogoutModal