import React from 'react'
import TopBar from './TopBar'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

const Main = () => {
  return (
    <div className='flex w-full h-full'>
        <div className="">
          <SideBar />
        </div>
        <div className="flex flex-col flex-1">
            {/* <TopBar /> */}
            <div className="bg-gray-100 overflow-hidden p-2 h-[full]"><Outlet /></div>
        </div>
    </div>
  )
}

export default Main