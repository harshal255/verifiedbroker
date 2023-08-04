import React from 'react'
import { Typography,Avatar } from '@material-tailwind/react'

const Testimonials = () => {
    return (
        <div className="flex flex-col gap-20 my-10 ">
            <h1 className='text-3xl text-center'>Testimonials</h1>
            <div className="flex flex-col items-center justify-center m-auto gap-5">
                <img src="/images/Partners/2.png" alt="amd" />
                <span className='text-lg'>Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their schedule.</span>
                <div className="flex items-center gap-4">
                    <Avatar src="/images/avtar.jpg" alt="avatar" />
                    <div>
                        <Typography variant="h6">Tania Andrew</Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Web Developer
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <button className="my-2 flex text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-primaryhover duration-300 hover:translate-y-2">
                    Try For Free
                </button>
            </div>
        </div>
    )
}

export default Testimonials
