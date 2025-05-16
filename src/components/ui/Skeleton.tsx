import React from 'react';

interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = 24, width = '100%', className = '', style }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      style={{ height, width, ...style }}
      aria-busy="true"
    />
  );
};

export default Skeleton;
