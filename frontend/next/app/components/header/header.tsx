"use client";
import { deleteCookie } from "cookies-next";
import Button from "design-system/components/Button";
import Header from "design-system/components/Header";
import Title from "design-system/components/Title";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type Props = {
    session: Session | null
}

const AppHeader: React.FC<Props> = ({ session }) => {
    const router = useRouter();
    const [name, setName] = useState('')
    useEffect(() => {
        setName(session?.user?.name || '');
    }, [session?.user?.name])

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/api/auth/signin');
        deleteCookie("jwt");
    };

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
                onClick={handleLogout}
                className="ml-auto"
            >
                Deslogar
            </Button>
        </Header>
    );
}

export default AppHeader;
