import React, { PropsWithChildren } from 'react';
import { Layout as BaseLayout, LayoutProps } from 'antd';
const { Header: BaseHeader } = BaseLayout;

const Header: React.FC<PropsWithChildren<LayoutProps>> = ({ children, ...props }) => (
    <BaseHeader
        {...props}
        className="flex justify-between items-center p-4 bg-white shadow-md"
    >
        {children}
    </BaseHeader>
);

export default Header;
