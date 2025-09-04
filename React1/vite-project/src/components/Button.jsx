// src/components/Button.jsx
import React from "react";

const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
