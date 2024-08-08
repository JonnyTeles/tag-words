import { Card as BaseCard, CardProps } from "antd";
import React from "react";

const Card: React.FC<CardProps> = (props) => (
    <BaseCard {...props} />
);

export default Card