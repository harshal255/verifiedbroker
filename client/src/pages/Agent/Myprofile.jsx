import React from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'
import { Button, Input } from '@material-tailwind/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiUploadCloud } from 'react-icons/fi'
import { BiSolidRightTopArrowCircle } from 'react-icons/bi'

const Myprofile = () => {
    return (
        <div className='h-fit flex flex-col'>
            <DashbordHeader></DashbordHeader>
            <Sidebar></Sidebar>
            <div className='w-4/5 h-full xl:ml-[17.5rem] p-5 flex flex-col gap-5'>
                <h1 className='text-4xl font-bold text-start'>My Profile</h1>
                <span className='text-sm'>We are glad to see you again!</span>
                <div>
                    <div className="flex flex-col xl:flex-row gap-10">
                        <div className='relative'>
                            <img src="/images/profile.jpg" alt="" className='rounded-xl' />
                            <span className='absolute right-2 top-2 bg-white rounded-xl p-3 text-black z-10 text-2xl'>
                                <AiOutlineDelete />
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <Button variant="gradient" className="flex items-center gap-3 justify-center" color='orange'>
                                <FiUploadCloud />
                                Upload Files
                            </Button>
                            <span className='text-sm'>Photos must be JPEG or PNG format and least 2048x768</span>
                        </div>

                    </div>
                </div>
                <div className="form1 mx-5">
                    <div className="flex flex-col xl:grid xl:grid-cols-3 gap-4 justify-around">
                        <div className="w-72">
                            <Input label="Username" />
                        </div>
                        <div className="w-72">
                            <Input label="Email" type='Email' />
                        </div>
                        <div className="w-72">
                            <Input label="Phone" type='phone' />
                        </div>
                        <div className="w-72">
                            <Input label="First Name" />
                        </div>
                        <div className="w-72">
                            <Input label="Second Name" />
                        </div>
                        <div className="w-72">
                            <Input label="Position" />
                        </div>
                        <div className="w-72">
                            <Input label="Lanuage" />
                        </div>
                        <div className="w-72">
                            <Input label="Company Name" />
                        </div>
                        <div className="w-72">
                            <Input label="Tax Number" />
                        </div>
                        <div className="max-w-full col-span-3 xl:mr-20">
                            <Input label="Address" />
                        </div>
                        <div className="max-w-full col-span-3 xl:mr-20">
                            <Input label="About Me" />
                        </div>
                        <div className="flex justify-end w-[69vw] my-10">
                            <Button variant="gradient" className="flex items-center gap-3 justify-center float-right" color='orange'>
                                Update Profile
                                <span className='text-2xl'> <BiSolidRightTopArrowCircle /></span>
                            </Button>
                        </div>

                    </div>
                </div>
                <div className="form2 mx-5">
                    <h1 className='my-5'>Social Media</h1>

                    <div className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
                        <div className="w-72">
                            <Input label="Facebook Url" />
                        </div>
                        <div className="w-72">
                            <Input label="Pinterest Url" />
                        </div>
                        <div className="w-72">
                            <Input label="Instagram Url" />
                        </div>
                        <div className="w-72">
                            <Input label="Twitter Url" />
                        </div>
                        <div className="w-72">
                            <Input label="Linkedin Url" />
                        </div>
                        <div className="w-72">
                            <Input label="Website Url (without http)" />
                        </div>
                        <div className="flex justify-end w-[69vw] my-10">
                            <Button variant="gradient" className="flex items-center gap-3 justify-center float-right" color='orange'>
                                Update Social
                                <span className='text-2xl'> <BiSolidRightTopArrowCircle /></span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="form3 mx-5">
                    <h1 className='my-5'>Change password</h1>
                    <div className="flex flex-col xl:grid xl:grid-cols-3 gap-4">
                        <div className="w-72 col-span-3">
                            <Input label="Old Password" />
                        </div>
                        <div className="w-72">
                            <Input label="New Password" />
                        </div>
                        <div className="w-72 ">
                            <Input label="Confirm New Password" />
                        </div>
                        <div className="flex justify-end w-[69vw] col-span-3 my-10">
                            <Button variant="gradient" className="flex items-center gap-3 justify-center float-right" color='orange'>
                                Change Password
                                <span className='text-2xl'> <BiSolidRightTopArrowCircle /></span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myprofile