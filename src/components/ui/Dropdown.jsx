import React from 'react'

export function DropdownMenu({ children}) {
    return (
        <div className="relative">
            {(children)}
        </div>
    );
}

export function DropdownMenuTrigger({ children, onClick }) {
    return (
        <button onClick={onClick} className="flex items-center w-full justify-start py-2 px-4 text-left rounded-md bg-transparent hover:bg-gray-700">
            {children}
        </button>
    );
}

export function DropdownMenuContent({ children, open, className, align = 'start',}) {
    return open ? (
        <div
            className={`absolute bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-56 z-10 ${className}`}
            style={{ right: align === 'end' ? 0 : 'auto' }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
        >
            {children}
        </div>
    ) : null
}

export function DropdownMenuLabel({ children }) {
    return (
        <div className="px-4 py-2 text-sm font-semibold text-gray-700">
            {children}
        </div>
    );
}

export function DropdownMenuSeparator() {
    return (
        <div className="border-t border-gray-200 my-1" />
    );
}

export function DropdownMenuItem({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            role="menuitem"
        >
            {children}
        </button>
    );
}
