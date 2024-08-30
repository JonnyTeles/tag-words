import { Tooltip as BaseTooltip, TooltipProps } from "antd";
import React, { PropsWithChildren } from "react";

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({ children, ...props }) => (
    <BaseTooltip {...props}>{children}</BaseTooltip>
);

export default Tooltip