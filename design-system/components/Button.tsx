import { Button as BaseButton, ButtonProps } from "antd";
import React from "react";

const Button: React.FC<ButtonProps> = (props) => (
    <BaseButton {...props} />
);

export default Button