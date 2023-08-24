import DashbordHeader from '../../components/AgentDashboard/Header'
import Sidebar from '../../components/AgentDashboard/Sidebar'
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