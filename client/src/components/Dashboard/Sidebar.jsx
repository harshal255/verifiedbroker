import React from 'react'
import { Card, List, ListItem, ListItemPrefix, Drawer, Typography, IconButton } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
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
import { AiOutlineMenuFold } from 'react-icons/ai'

const Sidebar = () => {

    //for sidebar drawer
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [selectedButton, setSelectedButton] = useState('Dashboard');
    const handleButtonClick = (buttonName) => {
        console.log("Button is selected" + buttonName);
        setSelectedButton(buttonName);
    };

    return (
        <div className='mt-28'>
            <span className='absolute top-28 right-5 block text-2xl border border-black cursor-pointer rounded-full p-2'><AiOutlineMenuFold onClick={openDrawer} /></span>
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
                    <Link to="/agentdash/addnewproperty" className={` transition ease-in rounded-lg ${selectedButton === 'AddNewProperties' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('AddNewProperties')}>
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

            </Drawer>
            <div className="hidden xl:block xl:max-w-fit overflow-y-auto fixed left-0 top-28 border border-black">
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
                        <Link to="/agentdash/addnewproperty" className={` transition ease-in rounded-lg ${selectedButton === 'AddNewProperties' ? 'bg-black  text-white' : 'bg:white text-black'}`} onClick={() => handleButtonClick('AddNewProperties')}>
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
        </div>
    )
}

export default Sidebar