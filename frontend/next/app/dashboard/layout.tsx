import React, { PropsWithChildren } from 'react';
import AppLayout from '../components/layout/app-layout';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <AppLayout>{children}</AppLayout>
    );
};

export default Layout;