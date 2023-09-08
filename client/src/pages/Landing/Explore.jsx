import { useEffect, useState } from 'react'
import { Card, Typography } from '@material-tailwind/react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdApartment } from 'react-icons/md';
import { GiHutsVillage } from 'react-icons/gi';
import { BiHomeAlt2 } from 'react-icons/bi';
import { MdBungalow } from 'react-icons/md';
import { GiWoodCabin } from 'react-icons/gi';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Explore = () => {

    const navigate = useNavigate();
    const [type, setType] = useState('');
    const find = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://v-bbackend.vercel.app/api/property?propertyType=${type}`,
        };

        await axios.request(config)
            .then((res) => {
                if (res.data.property.length > 0) {
                    toast.success("Property Found");
                    return navigate('/property', { state: { properties: res.data.property } });
                }
                else {
                    toast.error("No result found ");
                }
            })
            .catch((err) => {
                toast.error(err.response.statusText);
                console.error("failed to fetch property", err);
            });
    }

    useEffect(() => {
        if (type !== '') {
            find();
        }
    }, [type]);

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className='container mx-auto mt-0'>
                <Typography className="text-2xl ml-8 md:mt-0 font-bold lg:ml-10">Explore Apartment Types</Typography>
                <Typography className="ml-8 lg:ml-10">Give some inspirations from 1000+ skills</Typography>
            </div>
            <div className='explore container mx-auto w-auto p-5 grid grid-flow-col gap-4 overflow-auto'>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center justify-between lg:w-56 lg:h-60 hover:text-white hover:bg-black transition-all duration-1000 ease-in-out'
                    onClick={() => { setType('Houses') }}
                >
                    <BsFillHouseAddFill fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Houses</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Apartments') }}
                >
                    <MdApartment fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Apartments</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Office') }}
                >
                    <BiHomeAlt2 fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Office</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Villa') }}
                >
                    <GiHutsVillage fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Villa</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Townhome') }}
                >
                    <GiWoodCabin fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Townhome</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Bungalow') }}
                >
                    <MdBungalow fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Bungalow</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Land') }}
                >
                    <BiHomeAlt2 fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Land</Typography>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Explore
