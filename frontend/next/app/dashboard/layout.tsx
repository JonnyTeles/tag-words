import React, { PropsWithChildren } from 'react';
import AppLayout from '../components/layout/app-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard"
  };
  
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <AppLayout>{children}</AppLayout>
    );
};

export default Layout;