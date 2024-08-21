import { Typography as BaseTypography } from 'antd';
import React from 'react';
const { Link: BaseLink } = BaseTypography;

type LinkProps = React.ComponentProps<typeof BaseLink>;

const Link: React.FC<LinkProps> = (props) => (
    <BaseLink {...props} />
);

export default Link;
