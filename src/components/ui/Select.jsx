import React from 'react'

export const Select = ({ value, onValueChange, className = '', children }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 ${className}`}
        >
            {children}
        </select>
    </div>
);

export const SelectItem = ({ value, children }) => (
    <option value={value} className=''>{children}</option>
);

