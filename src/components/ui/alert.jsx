import { useState } from "react";

function Alert({ message, type, onClose }) {
  const alertStyles = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
  };

  return (
    <div className={`p-3 border-l-4 ${alertStyles[type]} rounded shadow-md`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="text-sm text-gray-500">Dismiss</button>
      </div>
    </div>
  );
}

export default Alert;
