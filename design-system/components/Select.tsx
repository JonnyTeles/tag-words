import { Select as BaseSelect, SelectProps } from "antd";
import React from "react";

const Select: React.FC<SelectProps> = (props) => (
    <BaseSelect {...props} />
);

export default Select