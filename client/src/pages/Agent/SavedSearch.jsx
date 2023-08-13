import React from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'

const SavedSearch = () => {
  return (
    <>
    <DashbordHeader></DashbordHeader>
    <Sidebar></Sidebar>
    <div className="w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
     Saved Search
    </div>
  </>
  )
}

export default SavedSearch