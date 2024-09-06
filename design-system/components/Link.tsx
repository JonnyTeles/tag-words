import { Typography as BaseTypography } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';
import React from 'react';
const { Link: BaseLink, } = BaseTypography;

const Link: React.FC<LinkProps> = (props) => (
    <BaseLink {...props} />
);

export default Link;
