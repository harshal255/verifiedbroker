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
import CTPVD from './pages/Agent/CTPVD'
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Admin from './pages/Admin'
import Home1 from './pages/Home1'
import Brokerlogin from './pages/Brokerlogin'
import Brokersignup from './pages/Brokersignup'
import AddProfileDetails from './pages/Agent/AddProfileDetails'

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
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <>
              <Header />
              <SignUp />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>

          }
        ></Route>
        <Route path="/admin" element={<Admin />}></Route>
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
        <Route path="/agentdash/addnewproperty" element={
          <>
            <AddProfileDetails></AddProfileDetails>
          </>
        }>
        </Route>
        <Route path="/agentdash/addprofiledetails"
          element={
            <>
              <AddProfileDetails></AddProfileDetails>
            </>
          }>
        </Route>
        <Route
          path="/landing"
          element={
            <>
              <Header></Header>
              <Home1></Home1>
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>
        <Route
          path="/brokersignup"
          element={
            <>
              <Brokersignup></Brokersignup>
            </>
          }
        >
        </Route>
        <Route
          path="/brokerlogin"
          element={
            <>
              <Brokerlogin></Brokerlogin>
            </>
          }
        >
        </Route>


      </Routes>
    </div >
  )
}

export default App
