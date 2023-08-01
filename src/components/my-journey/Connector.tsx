import React from "react";
interface ConnectorProps {
  isFill?: boolean;
}
const Connector: React.FC<ConnectorProps> = ({ isFill }) => {
  return (
    <div
      className={`flex-grow rounded-md h-1 -z-10 ${
        isFill ? "bg-primary" : "bg-secondary"
      }`}
    ></div>
  );
};

export default Connector;
