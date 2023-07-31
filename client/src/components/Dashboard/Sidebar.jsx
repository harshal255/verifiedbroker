import React from 'react'
import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import { Link, Outlet } from 'react-router-dom'
import { LuMessagesSquare, LuPackage2 } from 'react-icons/lu'
import { BsHouseAdd } from 'react-icons/bs'
import { BiHomeAlt2, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { CgProfile } from 'react-icons/cg'
import {
    PresentationChartBarIcon,
    PowerIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";
import { useState } from 'react'

const Sidebar = () => {

    const [selectedButton, setSelectedButton] = useState('Dashboard');
    const handleButtonClick = (buttonName) => {
        console.log("Button is selected" + buttonName);
        setSelectedButton(buttonName);
    };

    return (
        <div className="max-w-fit overflow-y-auto fixed left-0 top-28 border border-black">
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">

                <List>
                    <Link to="/agentdash" className={` transition ease-in rounded-lg hover:bg-black hover:text-white ${selectedButton === 'Dashboard' ? 'bg-black text-white' : 'bg:white text-black'}`}
                        onClick={() => handleButtonClick('Dashboard')}>
                        <ListItem>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal">
                                Dashboard
                            </Typography>
                        </ListItem>
                    </Link>
                    <Link to="/agentdash/ctpvd" className={` transition ease-in rounded-lg ${selectedButton === 'CTPVD' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('CTPVD')}>
                        <ListItem>
                            <ListItemPrefix>
                                <LuMessagesSquare className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-norma">
                                CTPVD
                            </Typography>
                        </ListItem>
                    </Link>
                    <hr className="my-2 border-blue-gray-50" />
                    <p className="text-left">MANAGE LISTINGS</p>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'AddNewProperties' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('AddNewProperties')}>
                        <ListItem>
                            <ListItemPrefix>
                                <BsHouseAdd className="h-5 w-5" />
                            </ListItemPrefix>
                            Add new Property
                        </ListItem>
                    </Link>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'Properties' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('Properties')}>
                        <ListItem>
                            <ListItemPrefix>
                                <BiHomeAlt2 className="h-5 w-5" />
                            </ListItemPrefix>
                            My Properties
                        </ListItem>
                    </Link>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'Templates' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('Templates')}>
                        <ListItem>
                            <ListItemPrefix>
                                <AiOutlineHeart className="h-5 w-5" />
                            </ListItemPrefix>
                            Templates
                        </ListItem>
                    </Link>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'ERP' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('ERP')}>
                        <ListItem>
                            <ListItemPrefix>
                                <CiSearch className="h-5 w-5" />
                            </ListItemPrefix>
                            ERP
                        </ListItem>
                    </Link>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'Reviews' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('Reviews')}>
                        <ListItem >
                            <ListItemPrefix>
                                <BiMessageDetail className="h-5 w-5" />
                            </ListItemPrefix>
                            Reviews
                        </ListItem>
                    </Link>
                    <hr className="my-2 border-blue-gray-50" />
                    <p className="text-left">MANAGE ACCOUNT</p>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'Package' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('Package')}>
                        <ListItem>
                            <ListItemPrefix>
                                <LuPackage2 className="h-5 w-5" />
                            </ListItemPrefix>
                            My Package
                        </ListItem>
                    </Link>
                    <Link to='/agentdash/profile' className={` transition ease-in rounded-lg ${selectedButton === 'Profile' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('Profile')}>
                        <ListItem>
                            <ListItemPrefix>
                                <CgProfile className="h-5 w-5" />
                            </ListItemPrefix>
                            My Profile
                        </ListItem>
                    </Link>
                    <Link className={` transition ease-in rounded-lg ${selectedButton === 'Logout' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('Logout')}>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </Link>
                </List>
            </Card>
        </div>
    )
}

export default Sidebar