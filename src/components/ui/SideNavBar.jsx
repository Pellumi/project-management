import React from 'react'

export function Sidebar({ children }) {
    return (
        <div className="flex flex-col w-64 bg-gray-800 text-white h-full">
            {children}
        </div>
    );
}

export function SidebarHeader({ children }) {
    return (
        <div className="flex flex-col p-4 bg-gray-900">
            {children}
        </div>
    );
}

export function SidebarContent({ children }) {
    return <div className="flex-1">{children}</div>;
}

export function SidebarMenu({ children }) {
    return (
        <div className="space-y-2 py-4 px-2">
            {children}
        </div>
    );
}

export function SidebarMenuItem({ children }) {
    return (
        <div className="w-full">
            {children}
        </div>
    );
}

export function SidebarMenuButton({ asChild, isActive, children }) {
    const Component = asChild ? React.Fragment : 'div';

    return (
        <Component>
            <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-colors ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
            >
                {children}
            </button>
        </Component>
    );
}

export function SidebarFooter({ children }) {
    return (
        <div className="p-4 bg-gray-900">
            {children}
        </div>
    );
}