import DashbordHeader from '../../components/AgentDashboard/Header'
import DashBoardBody from './DashBoardBody'
import CTPVD from './CTPVD'
import AddProfileDetails from './AddProfileDetails'
import Myprofile from './Myprofile'
import Myproperty from './Myproperty'
import Reviews from './Reviews'
import { useState } from 'react'
import { Drawer, Typography, IconButton } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { LuMessagesSquare } from 'react-icons/lu'
import { BsHouseAdd } from 'react-icons/bs'
import { BiHomeAlt2, BiMessageDetail } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import {
    PresentationChartBarIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineMenuFold } from 'react-icons/ai'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'

const AgentWholeDashboard = () => {

    //for sidebar drawer
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const navigate = useNavigate();


    const [selectedButton, setSelectedButton] = useState('Dashboard');

    const handleButtonClick = (buttonName) => {
        closeDrawer();
        // console.log("Button is selected" + buttonName);
        setSelectedButton(buttonName);

    };

    const displayedComponent = selectedButton === 'Dashboard' ? <DashBoardBody /> : selectedButton === 'CTPVD' ? <CTPVD /> : selectedButton === 'AddNewProperties' ? <AddProfileDetails /> : selectedButton === 'Properties' ? <Myproperty /> : selectedButton === 'Reviews' ? <Reviews /> : selectedButton === 'Profile' ? <Myprofile /> : <DashBoardBody />

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/logout', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
                toast.success(response.data.message);
                localStorage.clear();
                Cookies.remove('tokenjwt'); // Remove the token from the cookie
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
            console.error(error);
        }
    };
    return (
        <>
            <Toaster position="top-center"></Toaster>
            <DashbordHeader></DashbordHeader>
            {/* sidebar component */}
            <div className='mt-28'>
                <span className='absolute top-28 right-5 block text-2xl border border-black cursor-pointer rounded-full p-2 z-10'><AiOutlineMenuFold onClick={openDrawer} /></span>
                <Drawer open={open} onClose={closeDrawer} className=" overflow-scroll ">
                    <div className="mb-6 flex items-center justify-between p-5">
                        <Typography variant="h5" color="blue-gray">
                            Sidebar
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <div className="flex flex-col gap-1 mx-10">
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Dashboard' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={() => handleButtonClick('Dashboard')}
                        >

                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    Dashboard
                                </span>
                            </span>

                        </button>
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'CTPVD' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={() => handleButtonClick('CTPVD')}
                        >

                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <LuMessagesSquare className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    CTPVD
                                </span>
                            </span>

                        </button>
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'AddNewProperties' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={() => handleButtonClick('AddNewProperties')}
                        >

                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <BsHouseAdd className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    Add new Property
                                </span>
                            </span>

                        </button>
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Properties' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={() => handleButtonClick('Properties')}
                        >

                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <BiHomeAlt2 className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    My Properties
                                </span>
                            </span>

                        </button>
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Reviews' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={() => handleButtonClick('Reviews')}
                        >
                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <BiMessageDetail className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    Reviews
                                </span>
                            </span>
                        </button>
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Profile' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={() => handleButtonClick('Profile')}
                        >
                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <CgProfile className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    My Profile
                                </span>
                            </span>
                        </button>
                        <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Logout' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                            onClick={handleLogout}
                        >
                            <span className='flex justify-between gap-5 items-center '>
                                <span>
                                    <PowerIcon className="h-5 w-5" />
                                </span>
                                <span className="mr-auto font-normal">
                                    Logout
                                </span>
                            </span>
                        </button>

                    </div>

                </Drawer>
                <div className="hidden xl:block xl:max-w-fit overflow-y-auto fixed left-0 top-28 border border-black z-50 h-[100vh]">
                    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                        <div className="flex flex-col gap-1">
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Dashboard' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={() => handleButtonClick('Dashboard')}
                            >

                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <PresentationChartBarIcon className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        Dashboard
                                    </span>
                                </span>

                            </button>
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'CTPVD' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={() => handleButtonClick('CTPVD')}
                            >

                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <LuMessagesSquare className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        CTPVD
                                    </span>
                                </span>

                            </button>
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'AddNewProperties' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={() => handleButtonClick('AddNewProperties')}
                            >

                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <BsHouseAdd className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        Add new Property
                                    </span>
                                </span>

                            </button>
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Properties' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={() => handleButtonClick('Properties')}
                            >

                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <BiHomeAlt2 className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        My Properties
                                    </span>
                                </span>

                            </button>
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Reviews' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={() => handleButtonClick('Reviews')}
                            >
                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <BiMessageDetail className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        Reviews
                                    </span>
                                </span>
                            </button>
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Profile' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={() => handleButtonClick('Profile')}
                            >
                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <CgProfile className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        My Profile
                                    </span>
                                </span>
                            </button>
                            <button className={`transition ease-in rounded-lg hover:bg-black hover:text-white p-5 border border-black ${selectedButton === 'Logout' ? 'bg-black text-white duration-300' : 'bg-white text-black'}`}
                                onClick={handleLogout}
                            >
                                <span className='flex justify-between gap-5 items-center '>
                                    <span>
                                        <PowerIcon className="h-5 w-5" />
                                    </span>
                                    <span className="mr-auto font-normal">
                                        Logout
                                    </span>
                                </span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {displayedComponent}

        </>
    )
}

export default AgentWholeDashboard
