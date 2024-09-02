import { Space as BaseSpace, SpaceProps } from "antd";
import React, { PropsWithChildren } from "react";

const Space: React.FC<PropsWithChildren<SpaceProps>> = ({ children, ...props }) => (
    <BaseSpace {...props}>{children}</BaseSpace>
);

export default Space