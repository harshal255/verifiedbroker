import DashbordHeader from '../../components/AgentDashboard/Header'
import {
    Select,
    Option,
    Rating,
    Avatar,
} from "@material-tailwind/react";
import { AiFillStar } from 'react-icons/ai'
import { BsReply } from 'react-icons/bs'
import SingleProperty from '../../api/Singleproperty';
import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';


const Reviews = () => {

    const { user, setUser } = useContext(AuthContext);

    const getDate = (date) => {
        const parsedDate = new Date(date);
        const dateOnly = parsedDate.toLocaleDateString();
        return dateOnly;
    }

    const handleDelete = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://v-bbackend.vercel.app/api/${user._id}/reviewBroker/${user._id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };

        axios.request(config)
            .then((response) => {
                setTimeout(() => {
                    setUser(response.data.message)
                }, 1000)
                toast.success("Review Deleted Successfully");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }



    return (
        <>
            <Toaster position='top-center'></Toaster>
            <DashbordHeader></DashbordHeader>
            <div className="w-full xl:w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className='text-3xl font-bold'>Reviews</h1>
                    <span className='text-sm'>We are glad to see you again!</span>
                </div>
                {/* Review Section */}
                <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                    <div className="flex flex-col xl:flex-row gap-5  items-center justify-between">
                        {user && user.brokersDetails && <div className="flex items-center justify-evenly gap-3"><AiFillStar /> <span>{user.brokersDetails.ratings}</span> <span>•</span><span>{user.brokersDetails.numOfReviews} reviews</span></div>}
                    </div>
                    <div className='flex flex-col gap-10'>
                        {
                            user && user.brokersDetails && user.brokersDetails.reviews.map((element) => {
                                return (
                                    <div className='flex flex-col gap-5' key={element.id}>
                                        <div className="flex flex-col xl:flex-row justify-start xl:justify-between">
                                            <div className="grid grid-cols-2 xl:gap-x-4 xl:gap-y-1">
                                                <div className="row-span-2 flex items-center justify-center">
                                                    <Avatar src="https://res.cloudinary.com/dijdjkiqv/image/upload/v1692686408/Avatar/pyvclwz03vy0ty88cunf.jpg" alt="" className='h-14 w-14  rounded-full border' />
                                                </div>
                                                <div className="row-span-1  flex items-center justify-center gap-4 font-bold text-base">
                                                    {element.userName}
                                                    {user._id === element.userId && <AiOutlineDelete onClick={handleDelete} />}
                                                </div>
                                                <div className="row-span-1 flex items-center justify-center">Reviewed on {getDate(element.createdAt)}</div>
                                            </div>

                                            <div>
                                                <Rating value={element.rating} readonly />
                                            </div>
                                        </div>
                                        <p>{element.comment}</p>
                                        <hr className='border border-gray-500' />
                                    </div>

                                )
                            })

                        }
                    </div>


                </div>
            </div>
        </>
    )
}

export default Reviews
