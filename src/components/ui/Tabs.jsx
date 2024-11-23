import React from 'react'

export const Tabs = ({ defaultValue, children }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="w-full">
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    activeTab,
                    handleTabChange,
                })
            })}
        </div>
    )
}

export const TabList = ({ activeTab, handleTabChange, children }) => {
    return (
        <div className="flex border-b border-gray-300">
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    activeTab,
                    handleTabChange,
                })
            })}
        </div>
    )
}

export const TabContent = ({ value, activeTab, children }) => {
    if (activeTab !== value) return null

    return (
        <div className="p-4">
            {children}
        </div>
    )
}

export const Tab = ({ value, activeTab, handleTabChange, children }) => {
    return (
        <button
            className={`py-2 px-4 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors duration-200 ${activeTab === value ? 'border-b-2 border-blue-500 text-blue-500' : ''
                }`}
            onClick={() => handleTabChange(value)}
        >
            {children}
        </button>
    )
}

export const TabTrigger = ({ value, activeTab, handleTabChange, children }) => {
    const handleClick = () => {
        handleTabChange(value)
        console.log(`Tab ${value} triggered!`)
    }

    return (
        <button
            className={`py-2 px-4 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors duration-200 ${activeTab === value ? 'border-b-2 border-blue-500 text-blue-500' : ''
                }`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}
