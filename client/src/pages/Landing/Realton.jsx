import { Avatar, Typography, Card, Button } from '@material-tailwind/react'
import CallMadeIcon from '@mui/icons-material/CallMade';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const Realton = () => {

    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const find = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/property?status=${status}`,
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
        if (status !== '') {
            find();
        }
    }, [status]);

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className='container mx-auto w-auto mt-20 flex flex-col items-center'>
                <Typography className="text-2xl font-bold">See How Realton Can Help</Typography>
                <Typography>Lorem ipsum dolor sit amet consectetur.</Typography>
            </div>
            <div className='explore container mx-auto mt-10 w-auto p-5 grid grid-flow-row gap-5 lg:grid-flow-col'>
                <Card className='w-auto flex flex-col items-center justify-center p-5 lg:h-96'>
                    <Avatar src='/images/icon/property-buy.png' className='w-40 h-40'></Avatar>
                    <Typography className="text-xl mt-3 font-bold">Buy a property</Typography>
                    <Typography className="mt-5">Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.</Typography>
                    <Button variant="outlined" className='mt-6 flex flex-row justify-between text-black border-black'
                        onClick={() => {setStatus('Buy')}}
                    >
                        <Typography>Find home</Typography>
                        <CallMadeIcon />
                    </Button>
                </Card>


                <Card className='w-auto flex flex-col items-center justify-center p-5 lg:h-96'>
                    <Avatar src='/images/icon/property-sell.png' className='w-40 h-40'></Avatar>
                    <Typography className="text-xl mt-3 font-bold">Sell a property</Typography>
                    <Typography className="mt-5">Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.</Typography>
                    <Button variant="outlined" className='mt-6 flex flex-row justify-between text-black border-black'
                        onClick={() => { setStatus('Sell')}}
                    >
                        <Typography>Place an ad</Typography>
                        <CallMadeIcon />
                    </Button>
                </Card>


                <Card className='w-auto flex flex-col items-center justify-center p-5 lg:h-96'>
                    <Avatar src='/images/icon/property-rent.png' className='w-40 h-40'></Avatar>
                    <Typography className="text-xl mt-3 font-bold">Rent a property</Typography>
                    <Typography className="mt-5">Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.</Typography>
                    <Button variant="outlined" className='mt-6 flex flex-row justify-around text-black border-black'
                        onClick={() => { setStatus('Rent')}}
                    >
                        <Typography>Find a rental</Typography>
                        <CallMadeIcon />
                    </Button>
                </Card>



            </div>
        </>
    )
}

export default Realton
