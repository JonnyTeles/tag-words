import { Typography as BaseTypography, TypographyProps } from 'antd';
import React from 'react';
const { Title: BaseTitle } = BaseTypography;

type TitleProps = React.ComponentProps<typeof BaseTitle>;

const Title: React.FC<TitleProps> = (props) => (
    <BaseTitle {...props} />
);

export default Title;
