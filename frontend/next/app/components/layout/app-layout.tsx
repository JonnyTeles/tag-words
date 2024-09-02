"use client";
import React, { PropsWithChildren } from 'react';
import AppHeader from '../header/header';
import { useSession } from 'next-auth/react';
import Skeleton from 'design-system/components/Skeleton';
import { useSearchParams } from 'next/navigation';
import AddModal from '@/app/dashboard/modal/add-modal';
import DeleteModal from '@/app/dashboard/modal/delete-modal';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const searchParams = useSearchParams()
    const addParam = searchParams.get('add');
    const deleteParam = searchParams.get('delete');
    const isModal = searchParams.get('modal') === 'true';
    //TODO - MODAL PARA DESLOGAR
    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <div className="relative flex flex-col min-h-screen">
                    <AppHeader session={session} />
                    <main className="flex-1">
                        {children}
                        {isModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                {addParam && <AddModal />}
                                {deleteParam && <DeleteModal />}
                            </div>
                        )}
                    </main>
                </div>
            )}
        </>
    );
};

export default AppLayout;