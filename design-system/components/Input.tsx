import { Input as BaseInput, InputProps } from "antd";
import React from "react";

const Input: React.FC<InputProps> = (props) => (
    <BaseInput {...props} />
);

export default Input