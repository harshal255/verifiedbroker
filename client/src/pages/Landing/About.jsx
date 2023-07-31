import { Typography, Card, Button, Avatar } from '@material-tailwind/react'
import React from 'react'
import CallMadeIcon from '@mui/icons-material/CallMade';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const About = () => {
  return (
    <div className='container mx-auto mt-20 w-auto h-fit flex flex-col lg:grid lg:grid-cols-2 lg:box-border lg:h-[80vh] md:h-fit '>
      <Card className='h-fit w-auto p-10 m-5 bg-pink-50 text-black lg:h-[47%] flex flex-col items-center justify-center lg:bg-[url("./src/assets/images/about/home6-about-1.png")] bg-no-repeat bg-right-bottom bg-blend-hard-light'>
        <Typography className="text-[1.8rem] font-bold">The Way to Find Your Home</Typography>
        <Typography className="text-xl mt-2">From as low as $10 per day with limited time after discounts</Typography>
        <Button className='w-52 mt-6 flex flex-row justify-between hover:bg-red-300 shadow-none' color='orange'>
          <Typography>How It Works</Typography>
          <CallMadeIcon />
        </Button>
      </Card>
      <div className='grid grid-rows-4 lg:mt-5 lg:grid-cols-2'>
        <Card className='h-fit relative w-auto lg:w-80 p-6 m-5 mt-0 text-start bg-transparent shadow-none border-solid border-2'>
           <Typography className="text-red-500 mt-2 text-2xl font-bold">01</Typography>
           <Typography className="font-bold mt-4">Verified Broker At Your Service</Typography>
           <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta temporibus voluptas repellendus autem quidem dolorum!</Typography>
           <TravelExploreIcon className='absolute text-red-400 top-6 right-5' fontSize='large'/>
        </Card>
       
        <Card className='h-fit relative w-auto lg:w-80 p-6 m-5 mt-0 text-start bg-transparent shadow-none border-solid border-2'>
           <Typography className="text-red-500 mt-2 text-2xl font-bold">02</Typography>
           <Typography className="font-bold mt-4">Verified Broker At Your Service</Typography>
           <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta temporibus voluptas repellendus autem quidem dolorum!</Typography>
           <TravelExploreIcon className='absolute text-red-400 top-6 right-5' fontSize='large'/>
        </Card>
       
        <Card className='h-fit relative w-auto lg:w-80 p-6 m-5 mt-0 text-start bg-transparent shadow-none border-solid border-2'>
           <Typography className="text-red-500 mt-2 text-2xl font-bold">03</Typography>
           <Typography className="font-bold mt-4">Verified Broker At Your Service</Typography>
           <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta temporibus voluptas repellendus autem quidem dolorum!</Typography>
           <TravelExploreIcon className='absolute text-red-400 top-6 right-5' fontSize='large'/>
        </Card>
       
        <Card className='h-fit relative w-auto lg:w-80 p-6 m-5 mt-0 text-start bg-transparent shadow-none border-solid border-2'>
           <Typography className="text-red-500 mt-2 text-2xl font-bold">04</Typography>
           <Typography className="font-bold mt-4">Verified Broker At Your Service</Typography>
           <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta temporibus voluptas repellendus autem quidem dolorum!</Typography>
           <TravelExploreIcon className='absolute text-red-400 top-6 right-5' fontSize='large'/>
        </Card>
      
      </div>
    </div>
  )
}

export default About
