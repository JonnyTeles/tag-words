"use client"
import React, { PropsWithChildren } from 'react';
import AppHeader from '../header/header';
import { useSession } from 'next-auth/react';
import Skeleton from 'design-system/components/Skeleton';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <div className="flex flex-col min-h-screen">
                    <AppHeader session={session} />
                    <main className="flex-1">{children}</main>
                </div>
            )}
        </>
    );
};

export default AppLayout;
