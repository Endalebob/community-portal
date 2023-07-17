
import React from "react";
interface ConnectorProps {
  fill?: boolean;
}
const Connector: React.FC<ConnectorProps> = ({ fill }) => {
  return (
    <div
      className={`flex-grow rounded-md h-1 -z-10 ${
        fill ? "bg-primary" : "bg-secondary"
      }`}
    ></div>
  );
};

export default Connector;
