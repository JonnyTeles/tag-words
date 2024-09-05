import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useCustomHeader = (session: Session | null) => {
    const router = useRouter();
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient();

    useEffect(() => {
        setName(session?.user?.name || '');
    }, [])

    const handleLogout = async () => {
        await signOut({ redirect: false });
        queryClient.clear();
        queryClient.removeQueries();
        router.push('/api/auth/signin');
        deleteCookie("jwt");
    };

    const handleModal = () => {
        setOpen(!open)
    }

    return {
        name,
        open,
        handleLogout,
        handleModal
    }
}