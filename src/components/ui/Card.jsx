import React from 'react'

export function Card({ children, className="" }) {
    return (
        <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className }) {
    return (
        <div className={`mb-4 border-b pb-2 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className }) {
    return (
        <h2 className={`text-xl font-semibold text-gray-800 ${className}`}>
            {children}
        </h2>
    );
}

export function CardDescription({ children, className }) {
    return (
        <p className={`text-sm text-gray-600 ${className}`}>
            {children}
        </p>
    );
}

export function CardContent({ children, className }) {
    return (
        <div className={`text-gray-700 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className }) {
    return (
        <div className={`border-t border-gray-200 p-4 flex justify-end ${className}`}>
            {children}
        </div>
    );
}
