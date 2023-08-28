import { useEffect, useState } from 'react'
import { Avatar, Typography, Card, Button } from '@material-tailwind/react'
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { Divider } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


const Discover = () => {
    
    const [properties,setProperties] = useState([]);

    useEffect(() => {

        const fetchFeatured = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/property?ratings[gte]=3',
            };

            axios.request(config)
                .then((res) => {
                    setProperties(res.data.property)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
       fetchFeatured();
        
    }, [])

    return (
        <>
            <div className='container mx-auto w-auto h-[54vh] md:h-[85vh] lg:h-[90vh]'>
                <Typography className="text-[2rem] ml-6 pt-6 font-bold">Discover Our Featured Listings</Typography>
                <Typography className="text-[1.2rem] ml-6">Aliquam lacinia diam quis lacus euismod</Typography>
                <Slider {...settings} className='w-full p-2 mt-6'>
                    {properties.map((property, _id) => (
                        <Card key={_id} className='p-2 max-w-fit mx-2 lg:mx-5 flex flex-col gap-2'>
                            <Avatar variant='rounded' src={property.p_Images[0].url} className='w-full lg:h-[40vh] h-60'></Avatar>
                            <Typography className="text-2xl mt-2">{property.pName}</Typography>
                            <Typography>{property.country}</Typography>
                            <div className='flex flex-row items-center mt-2 mb-2 gap-4'>
                                <Typography className="flex flex-row items-center lg:gap-2"><span className='hidden lg:block'><KingBedIcon /></span>{property.bedroom}</Typography>
                                <Typography className="flex flex-row gap-2 items-center lg:gap-2"><span className='hidden lg:block'><BathtubIcon /></span>{property.bath}</Typography>
                                <Typography className="flex flex-row gap-2 items-center lg:gap-2"><span className='hidden lg:block' ><SquareFootIcon /></span>{property.pSize}</Typography>
                            </div>
                            <Divider />

                            <Typography className="text-xl left-4 absolute bottom-48 px-3 bg-white lg:px-4 lg:py-2 rounded-md font-bold">{property.price}</Typography>

                            {(property.ratings > 4.5 ) && <Button className='absolute top-8 left-6 w-fit px-10' color='red'>FEATURED</Button>}

                            <div className='flex justify-between mt-2'>
                                <Typography>{property.status}</Typography>
                            </div>
                        </Card>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default Discover
