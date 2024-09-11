import React, { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { CustomWordProvider } from '../provider/custom-word-context';
import PageTitle from './page-title';

export const metadata: Metadata = {
    title: "Palavra"
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <CustomWordProvider>
            <PageTitle />
            {children}
        </CustomWordProvider>
    );
};

export default Layout;