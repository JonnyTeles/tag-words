import { List as BaseList, ListProps } from 'antd';
import React, { PropsWithChildren } from 'react';

const ListItem = <T,>({ children, ...restProps }: PropsWithChildren<ListProps<T>>) => (
    <BaseList.Item {...restProps}>
        {children}
    </BaseList.Item>
);

export default ListItem;