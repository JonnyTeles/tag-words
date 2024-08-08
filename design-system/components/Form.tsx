import { Form as BaseForm, FormProps } from 'antd';
import React, { PropsWithChildren } from 'react';

const Form: React.FC<PropsWithChildren<FormProps>> = ({ children, ...restProps }) => (
    <BaseForm {...restProps}>
        {children}
    </BaseForm>
);

export default Form;
