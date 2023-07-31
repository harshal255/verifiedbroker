import Footer from './components/Footer'
import Header from './components/Header'
import MobileFooter from './components/MobileFooter'
import Agents from './pages/Agents'
import Becomeagent from './pages/Becomeagent'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Property from './pages/Property'
import AgentDashboard from './pages/Agent/AgentDashboard'
import Oneagent from './pages/Oneajent'
import Myprofile from './pages/Agent/Myprofile'
import DashBoardBody from './pages/Agent/DashBoardBody'
import DashbordHeader from './components/Dashboard/Header'
import Sidebar from './components/Dashboard/Sidebar'
import CTPVD from './pages/Agent/CTPVD'

function App() {


  return (
    <div className='w-full max-h-fit overflow-y-clip'>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home></Home>
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/becomeagent"
          element={
            <>
              <Header />
              <Becomeagent></Becomeagent>
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/agents"
          element={
            <>
              <Header />
              <Agents></Agents>
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/agent"
          element={
            <>
              <Header></Header>
              <Oneagent></Oneagent>
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/property"
          element={
            <>
              <Header />
              <Property></Property>
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/agentdash"
          element={
            <>
              <AgentDashboard />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>
        <Route path="/agentdash/profile" element={
          <>
            <Myprofile></Myprofile>
          </>
        }></Route>
        <Route path="/agentdash/ctpvd" element={
          <>
            <CTPVD></CTPVD>
          </>
        }>
        </Route>
      </Routes>
    </div>
  )
}

export default App
