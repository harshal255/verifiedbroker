import React, { useContext } from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'
import { Avatar, Button, Input, Typography, IconButton } from '@material-tailwind/react'
import { BiSolidRightTopArrowCircle } from 'react-icons/bi'
import AuthContext from '../AuthContext'
import { MdVerified } from 'react-icons/md'


const Myprofile = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='h-fit flex flex-col'>
            <DashbordHeader></DashbordHeader>
            <Sidebar></Sidebar>
            <div className='w-4/5 h-full xl:ml-[17.5rem] p-5 flex flex-col gap-5'>
                <h1 className='text-4xl font-bold text-start'>My Profile</h1>
                <span className='text-sm'>We are glad to see you again!</span>

                <div divider className="flex flex-col items-center justify-center gap-10">
                    {user && user.brokersDetails && <Avatar src={user.brokersDetails.photo.url} size="xxl" alt="avatar"></Avatar>}
                    {user && user.brokersDetails &&
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-black">
                            <span className="flex gap-2 items-center">User Name : <span className="font-light">{user.name} </span> <MdVerified className="text-deep-orange-500" /></span>
                            <span>Email id : <strong className="font-light">{user.email}</strong> </span>
                            <span>Date : <span className="font-light">21 Augest 2020</span> </span>
                            <span>Phone : <span className="font-light">{user.brokersDetails.phone}</span> </span>
                            <span>Payment Status : <span className="text-green-600 font-light">Yes</span> </span>
                            <span>Package : <span className="font-light">$0/mo</span></span>
                            <span>Address : <span className="font-light"> {user.brokersDetails.address}</span> </span>
                            <span className="xl:col-span-3">About : <span className="font-light">{user.brokersDetails.about}</span> </span>

                            <span className="xl:col-span-3">Experience : <span className="font-light">{user.brokersDetails.experience} </span></span>

                        </div>
                    }
                </div>

                <div className="flex justify-end w-[69vw] my-10">
                    <Button variant="gradient" className="flex items-center gap-3 justify-center float-right" color='red'>
                        Update Profile
                        <span className='text-2xl'> <BiSolidRightTopArrowCircle /></span>
                    </Button>
                </div>


            </div>
        </div>

    )
}

export default Myprofile