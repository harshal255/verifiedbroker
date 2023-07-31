import React from 'react'
import { Card, Typography } from '@material-tailwind/react';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BungalowIcon from '@mui/icons-material/Bungalow';
import CabinIcon from '@mui/icons-material/Cabin';

const Explore = () => {
    return (
        <>
            <div className='container mx-auto mt-0'>
                <Typography className="text-2xl ml-8 md:mt-0 font-bold lg:ml-10">Explore Apartment Types</Typography>
                <Typography className="ml-8 lg:ml-10">Give some inspirations from 1000+ skills</Typography>
            </div>
            <div className='explore container mx-auto w-auto p-5 grid grid-flow-col gap-4 overflow-auto'>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center justify-between lg:w-56 lg:h-60 hover:text-white hover:bg-black transition-all duration-1000 ease-in-out'>
                    <HouseIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Houses</Typography>
                        <Typography>22 properties</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'>
                    <ApartmentIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Apartments</Typography>
                        <Typography>22 properties</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'>
                    <HomeWorkIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Office</Typography>
                        <Typography>22 properties</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'>
                    <VillaIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Villa</Typography>
                        <Typography>22 properties</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'>
                    <CabinIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Townhome</Typography>
                        <Typography>22 properties</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'>
                    <BungalowIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Bungalow</Typography>
                        <Typography>22 properties</Typography>
                    </div>
                </Card>

            </div>
        </>
    )
}

export default Explore
