import DashbordHeader from '../../components/AgentDashboard/Header'
import {
    Select,
    Option,
    Rating,
} from "@material-tailwind/react";
import { AiFillStar } from 'react-icons/ai'
import { BsReply } from 'react-icons/bs'
import SingleProperty from '../../api/Singleproperty';

const Reviews = () => {
    return (
        <>
            <DashbordHeader></DashbordHeader>
            <div className="w-full xl:w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className='text-3xl font-bold'>Reviews</h1>
                    <span className='text-sm'>We are glad to see you again!</span>
                </div>
                {/* Review Section */}
                <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                    <div className="flex flex-col xl:flex-row gap-5  items-center justify-between">
                        <div className="flex items-center justify-evenly gap-3"><AiFillStar /> <span>5.0</span> <span>•</span><span>3 reviews</span></div>
                        <div className='flex items-center gap-1 xl:gap-3 justify-evenly'>Sort by : <span>
                            <Select size="sm" label=''>
                                <Option>Newest</Option>
                                <Option>Best Seller</Option>
                                <Option>Best Match</Option>
                                <Option>Price Low</Option>
                                <Option>Price High</Option>
                            </Select>
                        </span></div>
                    </div>
                    <div className='flex flex-col gap-10'>
                        {
                            SingleProperty.Reviews.map((element) => {
                                return (
                                    <div className='flex flex-col gap-5' key={element.id}>
                                        <div className="flex flex-col xl:flex-row justify-start xl:justify-between">
                                            <div className="grid grid-cols-2 xl:gap-x-4 xl:gap-y-1">
                                                <div className="row-span-2 flex items-center justify-center">
                                                    <img src="/images/Images/Reviews/users/1.png" alt="" className='h-14 w-14  rounded-full border' />
                                                </div>
                                                <div className="row-span-1  flex items-center justify-center font-bold text-base">{element.userName}</div>
                                                <div className="row-span-1 flex items-center justify-center">{element.reviewDate}</div>
                                            </div>

                                            <div>
                                                <Rating value={element.reviewcount} readonly />
                                            </div>
                                        </div>
                                        <p>{element.reviewmessage}</p>
                                        {element.images && (
                                            <div className="grid grid-cols-2 gap-5 xl:grid-cols-6 xl:gap-x-0">
                                                {element.images.map((element) => <img src={element.img} key={element.id} className='h-auto w-auto rounded-lg' />)}
                                            </div>
                                        )}

                                        <div className="flex gap-3 text-gray-800"> <span className='flex items-center gap-2 cursor-pointer'><BsReply /> Reply</span></div>
                                        <hr className='border border-gray-500'/>
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
