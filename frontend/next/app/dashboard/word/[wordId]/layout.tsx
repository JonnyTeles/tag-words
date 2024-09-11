import React, { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { CustomWordProvider } from '../provider/custom-word-context';

export const metadata: Metadata = {
    title: "Palavra"
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <CustomWordProvider>{children}</CustomWordProvider>
    );
};

export default Layout;