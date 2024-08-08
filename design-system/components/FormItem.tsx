import { Form as BaseForm, FormItemProps } from 'antd';
import React, { PropsWithChildren } from 'react';

const FormItem: React.FC<PropsWithChildren<FormItemProps>> = ({ children, ...restProps }) => (
    <BaseForm.Item {...restProps}>
        {children}
    </BaseForm.Item>
);

export default FormItem;
