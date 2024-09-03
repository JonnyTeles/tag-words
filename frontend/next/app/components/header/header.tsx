"use client";
import Button from "design-system/components/Button";
import Header from "design-system/components/Header";
import Title from "design-system/components/Title";
import { Session } from "next-auth";
import LogoutModal from "./components/logout-modal";
import { useCustomHeader } from "./hooks/useCustomHeader";
type Props = {
    session: Session | null
}

const AppHeader: React.FC<Props> = ({ session }) => {
    const { handleLogout, handleModal, name, open } = useCustomHeader(session)

    return (
        <Header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Title color="black" level={3}>Olá, {name}!</Title>
            <Button
                type='link'
                onClick={handleModal}
                className="ml-auto"
            >
                Sair
            </Button>
            <LogoutModal handleModal={handleModal} open={open} handleLogout={handleLogout} />
        </Header>
    );
}

export default AppHeader;
