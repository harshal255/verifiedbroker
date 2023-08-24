<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'
=======

import DashbordHeader from '../../components/AgentDashboard/Header'
import Sidebar from '../../components/AgentDashboard/Sidebar'
>>>>>>> Stashed changes
import DashBoardBody from './DashBoardBody'


const AgentDashboard = () => {


  return (
    <div className='flex flex-col items-center justify-center'>
        <>
          <DashbordHeader />
          <Sidebar />
          <DashBoardBody />
        </>
    </div>
  );
}

export default AgentDashboard