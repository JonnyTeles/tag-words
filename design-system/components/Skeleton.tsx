import { Skeleton as BaseSkeleton, SkeletonProps } from "antd";
import React from "react";

const Skeleton: React.FC<SkeletonProps> = (props) => (
    <BaseSkeleton {...props} />
);

export default Skeleton