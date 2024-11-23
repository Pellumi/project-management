import React from 'react'

export function Avatar({ children, className }) {
    return (
        <div className={`relative inline-block rounded-full ${className}`}>
            {children}
        </div>
    );
}

export function AvatarImage({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            className="rounded-full w-8 h-8 object-cover"
        />
    );
}

export function AvatarFallback({ children }) {
    return (
        <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-500 rounded-full">
            {children}
        </div>
    );
}
