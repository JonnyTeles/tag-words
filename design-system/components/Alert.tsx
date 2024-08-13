import { Alert as BaseAlert, AlertProps } from "antd";
import React from "react";

const Alert: React.FC<AlertProps> = (props) => (
    <BaseAlert {...props} />
);

export default Alert