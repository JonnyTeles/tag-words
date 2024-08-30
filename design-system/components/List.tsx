import { List as BaseList, ListProps } from 'antd';
import React, { PropsWithChildren } from 'react';

const List = <T,>({ children, ...restProps }: PropsWithChildren<ListProps<T>>) => (
    <BaseList {...restProps}>
        {children}
    </BaseList>
);

export default List;