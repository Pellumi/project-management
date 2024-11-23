import React from 'react'
import { FaX } from 'react-icons/fa6';

export const Dialog = ({ open, onOpenChange, children }) => {
    return open ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full relative max-w-md">
                {children}
                <button
                    className="absolute top-6 right-6 text-[24px] text-gray-500 hover:text-gray-800 flex items-center justify-center"
                    onClick={() => onOpenChange(false)}
                >
                    ×
                </button>
            </div>
        </div>
    ) : null;
};

export const DialogTrigger = ({ asChild, children, onClick }) => {
    return React.cloneElement(children, {
        onClick: () => onClick(true),
    });
};

export const DialogContent = ({ children }) => (
    <div className="dialog-content">{children}</div>
);

export const DialogHeader = ({ children }) => (
    <div className="dialog-header mb-4">{children}</div>
);

export const DialogTitle = ({ children }) => (
    <h2 className="text-xl font-semibold">{children}</h2>
);