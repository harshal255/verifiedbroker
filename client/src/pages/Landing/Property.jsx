import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cities from './Cities';
import { Avatar, Card, Typography } from '@material-tailwind/react';


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

const Property = () => {
    return (
        <div className='container w-auto mx-auto h-fit bg-white relative py-10'>
            <Typography className="text-[2rem] ml-4 font-bold">Properties by Cities</Typography>
            <Typography className="text-[1.5rem] ml-4">Aliquam lacinia diam quis lacus euismod</Typography>
            <Slider {...settings} className='mt-6 h-[44vh] lg:h-[70vh]'>
                {Cities.map((city, index) => (
                    <Card key={index}  className='relative shadow-none w-[70vw] h-[60vh] lg:h-fit p-4 bg-transparent flex flex-col gap-2'>
                        <Avatar src={city.imgSrc} variant='rounded' className='w-full h-[40vh] lg:h-[60vh]'></Avatar>
                        <Typography className="absolute top-10 left-10 text-white text-2xl">{city.cityName}</Typography>
                        <Typography className="absolute top-20 left-10 text-white text-xl">{city.propertyCount}+ Properties</Typography>
                    </Card>
                ))}
            </Slider>
        </div>
    )
}

export default Property