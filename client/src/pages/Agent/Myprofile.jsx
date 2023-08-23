import React, { useContext, useState, useEffect } from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'
import { Avatar, Button, Input, Textarea, Typography, IconButton, Dialog, DialogBody, DialogHeader, DialogFooter } from '@material-tailwind/react'
import { BiSolidRightTopArrowCircle } from 'react-icons/bi'
import AuthContext from '../AuthContext'
import { MdVerified } from 'react-icons/md'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Myprofile = () => {

    const [open, setOpen] = useState(false);

    const { user, setUser } = useContext(AuthContext);

    // console.log(user);
    const navigate = useNavigate();

    const [updatedUser, setUpdatedUser] = useState({
        name: "",
        photo: "",
        phone: "",
        experience: "",
        about: "",
        reference: "",
        address: "",
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        if (user && user.brokersDetails) {
            setUpdatedUser({
                name: user.name,
                photo: user.brokersDetails.photo.url,
                phone: user.brokersDetails.phone,
                experience: user.brokersDetails.experience,
                about: user.brokersDetails.about,
                reference: user.brokersDetails.reference,
                address: user.brokersDetails.address
            });
        }
    }, [user]);

    // console.log(updatedUser);

    const handleChange = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setUpdatedUser((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlePhoto = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleOpen = () => setOpen(!open);

    const handleUpdate = async () => {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/update/broker/${user._id}`,
            withCredentials: true,
            data: updatedUser,
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
        await axios.request(config)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setOpen(false);
                    setUser(res.data.data);
                    setTimeout(() => {
                        toast.success("Profile updated successfully");
                    }, 1000);
                }
            })
            .catch(
                (error) => {
                    setOpen(false);
                    toast.error('Failed to Update User');
                }
            )
    }


    return (
        <>
            <Toaster position='top-center'></Toaster>
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
                                <span>Payment Status : <span className="text-green-600 font-light">{user.brokersDetails.paymentStatus ? "Yes" : "No"}</span></span>
                                <span>Package : <span className="font-light">₹{user.brokersDetails.package}/month</span></span>
                                <span>Address : <span className="font-light"> {user.brokersDetails.address}</span> </span>
                                <span className="xl:col-span-3">About : <span className="font-light">{user.brokersDetails.about}</span> </span>

                                <span className="xl:col-span-3">Experience : <span className="font-light">{user.brokersDetails.experience} </span></span>

                            </div>
                        }
                    </div>

                    <Dialog open={open} handler={handleOpen} size={"xl"}>
                        <DialogHeader>Update Profile</DialogHeader>
                        {updatedUser && <DialogBody divider className="flex flex-col items-center justify-center gap-8">
                            <label htmlFor="photo-upload" className="profile-photo">
                                <Avatar src={image != null ? image : updatedUser.photo} size="xxl" alt="avatar"></Avatar>
                            </label>
                            <input
                                type="file"
                                name="photo"
                                id="photo-upload"
                                style={{ display: 'none' }}
                                onChange={(e) => { handleChange(e), handlePhoto(e) }}
                            />
                            <div className="grid grid-cols-3 gap-5 text-black">

                                <Input type="text" size="lg" name="name" value={updatedUser.name} onChange={handleChange}
                                    color="orange" label={
                                        <>
                                            Name: <span className="text-red-500">*</span>
                                        </>
                                    } />

                                <Input type="phone" size="lg" name="phone" value={updatedUser.phone} onChange={handleChange}
                                    color="orange" label={
                                        <>
                                            Phone No: <span className="text-red-500">*</span>
                                        </>
                                    } />
                                <Input size="lg" type="text" name="experience" value={updatedUser.experience} onChange={handleChange}
                                    color="orange" label={
                                        <>
                                            Experience: <span className="text-red-500">*</span>
                                        </>
                                    } />
                                <Input type="text" name="about" value={updatedUser.about} onChange={handleChange}
                                    size="lg" color="orange" label={
                                        <>
                                            About <span className="text-red-500">*</span>
                                        </>
                                    } />

                                <Input
                                    size="lg"
                                    name="reference"
                                    value={updatedUser.reference}
                                    onChange={handleChange}
                                    type="text"
                                    color="orange"
                                    label={
                                        <>
                                            Reference : <span className="text-red-500">*</span>
                                        </>
                                    }
                                />

                                <Input size="lg" name="address" value={updatedUser.address} onChange={(e) => handleChange(e)}
                                    color="orange" label={
                                        <>
                                            Address: <span className="text-red-500">*</span>
                                        </>
                                    } />

                            </div>
                        </DialogBody>}
                        <DialogFooter>
                            <Button variant="gradient" color="red" onClick={handleOpen}>
                                <span>Close</span>
                            </Button>
                            <Button variant="gradient" color="red" className='ml-6' onClick={handleUpdate}>
                                <span>Update</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>

                    <div className="flex justify-end w-[69vw] my-10">
                        <Button variant="gradient" className="flex items-center gap-3 justify-center float-right" color='red' onClick={handleOpen}>
                            Update Profile
                            <span className='text-2xl'> <BiSolidRightTopArrowCircle /></span>
                        </Button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Myprofile