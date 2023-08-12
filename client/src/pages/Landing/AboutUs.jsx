import React from 'react'
import { Avatar, Card, Typography, Button } from '@material-tailwind/react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CallMadeIcon from '@mui/icons-material/CallMade';


const AboutUs = () => {
    return (
        <div className='container mx-auto w-auto lg:h-[85vh] bg-gray-200 p-5 flex flex-col gap-4 mt-10 lg:flex-row lg:relative '>
            <Card className='flex flex-col p-8 gap-5 lg:h-fit lg:w-96  lg:absolute lg:top-12 lg:left-24 lg:gap-2 lg:p-7'>
                <Typography className="text-2xl font-bold"><span className='text-red-400'>200+</span> Exclusive Agents</Typography>
                <Card className='flex flex-row gap-6 shadow-none items-center'>
                    <Avatar src='/images/team/ea-1.png' alt='image' className="h-20 w-20 lg:h-16 lg:w-16"></Avatar>
                    <div className='about'>
                        <Typography className="text-2xl font-bold lg:text-lg">Ashish parmar</Typography>
                        <Typography>60+ Property listed</Typography>
                    </div>
                </Card>
                <Card className='flex flex-row gap-6 shadow-none items-center'>
                    <Avatar src='/images/team/ea-2.png' alt='image' className="h-20 w-20 lg:h-16 lg:w-16"></Avatar>
                    <div className='about'>
                        <Typography className="text-2xl font-bold lg:text-lg">Mukesh Yadav</Typography>
                        <Typography>60+ Property listed</Typography>
                    </div>
                </Card>
                <Card className='flex flex-row gap-6 shadow-none items-center'>
                    <Avatar src='/images/team/ea-3.png' alt='image' className="h-20 w-20 lg:h-16 lg:w-16"></Avatar>
                    <div className='about'>
                        <Typography className="text-2xl font-bold lg:text-lg">Babu Rao</Typography>
                        <Typography>60+ Property listed</Typography>
                    </div>
                </Card>
                <Card className='flex flex-row gap-6 shadow-none items-center'>
                    <Avatar src='/images/team/ea-4.png' alt='image' className="h-20 w-20 lg:h-16 lg:w-16"></Avatar>
                    <div className='about'>
                        <Typography className="text-2xl font-bold lg:text-lg">Alok Nath</Typography>
                        <Typography>60+ Property listed</Typography>
                    </div>
                </Card>
            </Card>
            <Card className="flex flex-col p-8 gap-5 lg:h-fit lg:absolute lg:top-36 lg:left-96">
                <Avatar src='/images/team/agent-5.jpg' className='w-auto h-50' variant='rounded'></Avatar>
                <div>
                    <Typography className="text-2xl font-bold">Rina Chaudhary</Typography>
                    <Typography>50+ property listed</Typography>
                </div>
            </Card>
            <Card className='flex flex-col p-8 gap-3 bg-transparent shadow-none lg:w-1/3 lg:ml-36 lg:absolute lg:right-16 lg:top-0'>
                <Typography className="text-[2rem] font-bold">Let’s find the right selling option for you</Typography>
                <Typography className="text-xl">Lorem  amet consectetur adipisicing elit. Officiis facere culpa praesentium vel odit voluptates totam dicta qui sed atque!</Typography>
                <div className='flex flex-row gap-2 items-center lg:mt-4'>
                    <CheckCircleIcon fontSize='large' />
                    <Typography className="text-[1.5rem] font-bold">Find excellent deals</Typography>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <CheckCircleIcon fontSize='large' />
                    <Typography className="text-[1.5rem] font-bold">Friendly host & Fast support</Typography>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <CheckCircleIcon fontSize='large' />
                    <Typography className="text-[1.5rem] font-bold">List your own property</Typography>
                </div>
                <Button className='w-44 mt-6 lg:mt-16 text-white flex flex-row justify-between hover:bg-red-300' color='red'>
                    <Typography>See More</Typography>
                    <CallMadeIcon />
                </Button>
            </Card>
            <img src='/images/about/element-3.png' alt='img' className='w-20 h-20 hidden lg:block lg:absolute lg:top-5 lg:left-[50%] opacity-20'></img>
            <img src='/images/about/element-5.png' alt='img' className='w-20 h-6 hidden lg:block lg:absolute lg:top-[80%] lg:left-[20%] opacity-25'></img>
            <img src='/images/about/element-3.png' alt='img' className='w-20 h-20 hidden lg:block lg:absolute lg:top-[80%] lg:left-[55%] opacity-20'></img>
            <img src='/images/about/element-7.png' alt='img' className='w-16 h-20 hidden lg:block lg:absolute lg:top-[30%] lg:left-4'></img>
        </div>
    )
}

export default AboutUs
