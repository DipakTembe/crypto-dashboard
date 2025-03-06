import React from 'react'

const Card = ({ header, children }) => {
  return (
    <div className="bg-white border rounded-md shadow-md p-1 h-full">
      {header && <div className="text-lg font-semibold mb-2">{header}</div>}
      <div>{children}</div>
    </div>
  );
};

export default Card
