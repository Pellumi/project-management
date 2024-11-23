import React from 'react'

export const Button = ({ type = 'button', className = '', children, onClick, ...props }) => (
    <button
        type={type}
        className={`px-4 py-2 bg-gray-900 min-h-[40px] text-white rounded hover:bg-gray-700 ${className}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
);
