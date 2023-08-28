import Footer from './components/Footer'
import Header from './components/Header'
import MobileFooter from './components/MobileFooter'
import Agents from './pages/Agents'
import Becomeagent from './pages/Becomeagent'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Property from './pages/Property'
import Oneagent from './pages/Oneajent'
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home1 from './pages/Home1'
import Brokerlogin from './pages/Brokerlogin'
import Brokersignup from './pages/Brokersignup'
import Singleproperty from './pages/Singleproperty'
import { useContext } from 'react'
import AuthContext from './pages/AuthContext'
import Admin from './pages/Admin/Admin'
import AgentWholeDashboard from './pages/Agent/AgentWholeDashboard'
import NoMatch from './pages/NoMatch'

import Festivalcard from './pages/Admin/Festivalcard'


function App() {
  const { user } = useContext(AuthContext);
  const isAdmin = localStorage.getItem('role') == "admin" ? true : false;

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
        <Route path="/singleproperty" element={
          <>
            <Header />
            <Singleproperty />
            <MobileFooter></MobileFooter>
            <Footer></Footer>
          </>
        }></Route>
        {user && user.brokersDetails?.paymentStatus && (
          <Route path="/agentdash" element={
            <>
              <AgentWholeDashboard></AgentWholeDashboard>
            </>
          } />
        )}
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
        {isAdmin && (<Route path="/admin"
          element={
            <>
              <Header />
              <Admin></Admin>
              <Footer></Footer>
            </>
          } />
        )}

        {isAdmin && (<Route path="/admin/festivalcard"
          element={
            <>
              <Header />
              <Festivalcard />
            </>
          } />
        )}
        
        <Route
          path="*"
          element={
            <>
              <Header />
              <NoMatch />
              <MobileFooter />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </div >
  )
}

export default App
