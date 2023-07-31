import React from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'
import DashBoardBody from './DashBoardBody'
import BarChartHours from './BarChartHours'
import AreaChartWeekly from './AreaChartWeekly'

const AgentDashboard = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <DashbordHeader></DashbordHeader>
      <Sidebar></Sidebar>
      <DashBoardBody></DashBoardBody>
      <BarChartHours />
      <AreaChartWeekly />
    </div>
  )
}

export default AgentDashboard