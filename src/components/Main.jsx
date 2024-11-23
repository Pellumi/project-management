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
            <div className="bg-gray-100 rounded-[24px] rounded-b-none overflow-hidden p-4 h-[calc(100%)]"><Outlet /></div>
        </div>
    </div>
  )
}

export default Main