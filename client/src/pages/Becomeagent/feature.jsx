import Features from '../../api/Features'
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
  Input,
} from "@material-tailwind/react";
import { BsPlayFill } from 'react-icons/bs';




const feature = () => {
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  


  return (
    <div className="lg:my-20 w-full overflow-clip">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-center text-4xl">Features</h1>
        <span className="text-center text-xl lg:w-[28rem] flex-wrap">Most calendars are designed for teams. Slate is designed for freelancers</span>
      </div>
      <div className="grid grid-rows-3 lg:grid-cols-3 gap-3 my-5 lg:my-20 lg:py-20">
        {
          Features.map((element) => {
            return (
              <div key={element.id} className='flex flex-col items-center justify-center gap-5'>
                <img src={element.img} alt={element.title} />
                <h1 className='text-bold text-2xl font-bold'>{element.title}</h1>
                <div className='text-xl'>{element.desc}</div>
              </div>
            )
          })
        }

      </div>

      <div className='relative lg:h-1/2 lg:w-1/2 m-auto lg:-mt-[32.5rem] cursor-pointer' onClick={handleOpen}>
        <img src='/images/video.png' alt="nature"
          className=" object-cover" ></img>
        <div className='bg-primary p-8 rounded-full flex items-center justify-center absolute z-10 top-[10%] left-[32.5%] lg:top-[37.5%] lg:left-[42.5%]  animate-ping'>  <BsPlayFill className='text-5xl text-white text-center'></BsPlayFill></div>
      </div>

      <Dialog size="md" open={open} handler={handleOpen}>
        <video className="h-full w-full rounded-lg" controls autoPlay>
          <source src="/images/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Dialog>

      <div className="flex flex-col lg:flex-row justify-between items-center my-5 lg:my-10 gap-5">
        <div className='flex-col gap-5 '>
          <h1 className='text-3xl font-semibold'>Fastest way to organize</h1>
          <span>Most calendars are designed for teams. Slate is designed for freelancers</span>
          <div className="flex gap-2 justify-center">
            <button className="my-2 flex text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-primaryhover duration-300 hover:translate-y-2">
              Try For Free
            </button>
          </div>


        </div>
        <div>
          <img src="/images/MacbookPro.png" alt="" />
        </div>
      </div>

    </div>
  )
}

export default feature
