import React from "react";

interface ProgressIndicatorProps {
  size?: number;
  color?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  size = 8,
  color = "blue",
}) => {
  const containerStyle = `w-${size} h-${size} inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`;
  const spinnerStyle = `!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]`;

  return (
    <div className={containerStyle}>
      <span className={spinnerStyle}></span>
    </div>
  );
};

export default ProgressIndicator;