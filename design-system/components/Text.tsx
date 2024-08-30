import { Typography as BaseTypography } from 'antd';
import React from 'react';
const { Text: BaseText } = BaseTypography;

type TextProps = React.ComponentProps<typeof BaseText>;

const Text: React.FC<TextProps> = (props) => (
    <BaseText {...props} />
);

export default Text;
