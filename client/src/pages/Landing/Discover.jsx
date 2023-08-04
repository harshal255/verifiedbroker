import React, { useState } from 'react'
import { Avatar, Typography, Card, Button } from '@material-tailwind/react'
import Cards from './Cards'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    return (
        <>
            <div className='container mx-auto w-auto h-[54vh] md:h-[85vh] lg:h-[90vh] bg-gray-300'>
                <Typography className="text-[2rem] ml-6 pt-6 font-bold">Discover Our Featured Listings</Typography>
                <Typography className="text-[1.2rem] ml-6">Aliquam lacinia diam quis lacus euismod</Typography>
                <Slider {...settings} className='w-full p-2 mt-6'>
                    {Cards.map((card, index) => (
                        <Card key={index} className='p-2 max-w-fit mx-2 lg:mx-5 flex flex-col gap-2'>
                            <Avatar variant='rounded' src={card.imgSrc} className='w-full lg:h-[40vh] h-60'></Avatar>
                            <Typography className="text-2xl mt-2">{card.title}</Typography>
                            <Typography>{card.location}</Typography>
                            <div className='flex flex-row items-center mt-2 mb-2 gap-4'>
                                <Typography className="flex flex-row items-center lg:gap-2"><span className='hidden lg:block'><KingBedIcon /></span>{card.bed}</Typography>
                                <Typography className="flex flex-row gap-2 items-center lg:gap-2"><span className='hidden lg:block'><BathtubIcon /></span>{card.bath}</Typography>
                                <Typography className="flex flex-row gap-2 items-center lg:gap-2"><span className='hidden lg:block' ><SquareFootIcon /></span>{card.sqft}</Typography>
                            </div>
                            <Divider />

                            <Typography className="text-xl left-4 absolute bottom-48 px-3 bg-white lg:px-4 lg:py-2 rounded-md font-bold">{card.price}</Typography>

                            {card.tag && <Button className='absolute top-8 left-6 w-fit px-10' color='orange'>{card.tag}</Button>}

                            <div className='flex justify-between mt-2'>
                                <Typography>For Rent</Typography>
                                <div className='flex gap-4'>
                                    <IosShareIcon />
                                    <ContentCopyIcon />
                                    <FavoriteBorderIcon />
                                </div>
                            </div>

                        </Card>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default Discover
