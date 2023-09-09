import { RiMenuFoldFill } from 'react-icons/ri'
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,

} from "@material-tailwind/react";
import { useContext, useState } from 'react';
// import { UserCircleIcon } from "@heroicons/react/24/solid";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../pages/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
    const [openRight, setOpenRight] = useState(false);

    const { user, setUser } = useContext(AuthContext);

    console.log(user);

    const navigate = useNavigate();

    const openDrawerRight = () => {
        setOpenRight(true);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";

    }
    const closeDrawerRight = () => {
        setOpenRight(false);
        document.body.style.overflow = "";
        document.body.style.height = "";

    }

    const handleDashboard = () => {
        if (!Cookies.get("tokenjwt")) {
            toast.error("Please Log In");
        } else if (user && user.brokersDetails && user.brokersDetails.paymentStatus) {
            navigate("/agentdash");
        } else {
            toast.error("Please take a subcription");
        }
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get('https://v-bbackend.vercel.app/api/logout', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
                toast.success(response.data.message);
                localStorage.clear();
                Cookies.remove('tokenjwt');
                setTimeout(() => {
                    setUser(null) // Remove the token from the cookie
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
            <Toaster position='top-center'></Toaster>
            <div className="fixed top-0 flex h-20 w-screen bg-white justify-around items-center z-20">
                <div className='xl:order-2'><span className="font-bold text-red-400 text-xl">Logo</span></div>
                <div>
                    <ul className="font-semibold hidden xl:flex xl:order-1 justify-between sm:gap-6 md:gap-8 xl:gap-10 ">
                        <Link to="/property"><li className='cursor-pointer'>Property</li></Link>
                        <Link to="/login"><li className='cursor-pointer'> Login</li></Link>
                        <Link to="/signup"> <li className='cursor-pointer'>Signup</li></Link>
                        <Link to="/agents"> <li className='cursor-pointer'>Find Agent</li></Link>
                    </ul>
                </div>

                <div className='flex items-center xl:order-3'>
                    <ul className="font-semibold hidden xl:flex justify-between sm:gap-6 md:gap-8 xl:gap-10">
                        {user && <li className='cursor-pointer' onClick={handleLogout}>Logout</li>}
                        <li className='cursor-pointer' onClick={handleDashboard}>Desh</li>
                        <Link to="/becomeagent"> <li className='cursor-pointer'>Become Agent</li></Link>
                        <Link to="/landing"> <li className='cursor-pointer'>Landing</li></Link>

                    </ul>
                    <span onClick={openDrawerRight} className='cursor-pointer'><RiMenuFoldFill></RiMenuFoldFill></span>

                </div>
            </div>
            <Drawer
                placement="right"
                open={openRight}
                onClose={closeDrawerRight}
                className="p-4"
            >
                <div className="mb-6 flex items-center justify-between">
                    <span className="font-bold text-orange-900 text-xl">Logo</span>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={closeDrawerRight}
                    >
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
                <List>
                    <ListItem>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Buy
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Rent
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Sell
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Find Agent
                    </ListItem>
                    <hr className='border-gray-500' />
                    <ListItem>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Blogs
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Become Agent
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            {/* <UserCircleIcon className='h-5 w-5'></UserCircleIcon> */}
                        </ListItemPrefix>
                        Sign in
                    </ListItem>
                </List>
            </Drawer >

        </>
    )
}

export default Header