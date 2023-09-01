import React from "react";

const Input = ({className, ...props}) => {
  return (
    <input className={`w-full rounded-md border-gray-500 ${className || ''}`} {...props} />
  );
}

export default Input;