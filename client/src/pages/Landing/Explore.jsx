import { useEffect, useState } from 'react'
import { Card, Typography } from '@material-tailwind/react';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BungalowIcon from '@mui/icons-material/Bungalow';
import CabinIcon from '@mui/icons-material/Cabin';
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
            url: `http://localhost:3000/api/property?propertyType=${type}`,
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
                    onClick={() => { setType('Houses')}}
                >
                    <HouseIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Houses</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Apartments')}}
                >
                    <ApartmentIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Apartments</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Office')}}
                >
                    <HomeWorkIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Office</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Villa')}}
                >
                    <VillaIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Villa</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Townhome')}}
                >
                    <CabinIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Townhome</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Bungalow')}}
                >
                    <BungalowIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full ' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Bungalow</Typography>
                    </div>
                </Card>
                <Card className='h-48 w-44 bg-gray-200 flex flex-col items-center  hover:text-white hover:bg-black transition-all duration-1000 ease-in-out justify-between lg:w-56 lg:h-60'
                    onClick={() => { setType('Land')}}
                >
                    <HomeWorkIcon fontSize='large' className='h-20 w-20 mt-10 rounded-full' />
                    <div className='info'>
                        <Typography className="text-xl font-bold">Land</Typography>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Explore
