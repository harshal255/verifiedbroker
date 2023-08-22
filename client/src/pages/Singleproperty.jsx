import React, { useEffect, useState } from 'react'
import {
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
    Rating,
    Textarea
} from "@material-tailwind/react";
import { BiBed, BiBath } from 'react-icons/bi'
import Singleproperties from '../api/Singleproperty.js'
import { TbRulerMeasure } from 'react-icons/tb'
import { AiOutlinePhone } from 'react-icons/ai'
import SingleProperty from '../api/Singleproperty.js';
import { AiFillStar } from 'react-icons/ai'
import { FaThumbsUp } from 'react-icons/fa6'
import { FaThumbsDown } from 'react-icons/fa6'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiShareAlt, BiTimeFive } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom';
import Properties from '../api/Property';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'

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


const Singleproperty = () => {

    const [property, setProperty] = useState(null);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const location = useLocation();
    const pId = location.state?.pId;
    
    useEffect(() => {
        const fetchPropertydata = async () => {
            console.log(pId);
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/property/${pId}`,
                withCredentials: true,
            };
            
            await axios.request(config)
                .then((res) => {
                    setProperty(res.data.data);
                })
                .catch((err) => {
                    toast.error(err.response.statusText);
                    console.error("failed to fetch property details", err);
                });
        }
        fetchPropertydata();
    }, [pId]);

    const handleReviewClick = async () => {
        const data = {
            rating: rating,
            comment: comment,
        };
        const uId = localStorage.getItem('uId');
     
        let config = {
            method : 'post',
            maxBodyLength : Infinity,
            url : `http://localhost:3000/api/${uId}/review/${pId}`,
            withCredentials : true,
            data : data,
        }

        await axios.request(config)
        .then((res)=>{
            console.log(res.data);
            toast.success("Review Added Successfully");
        })
        .catch((err)=>{
           toast.error(err.response.data.message);
           console.error("Review Post error",err); 
        }); 
    }

    if (!property) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className='flex flex-col gap-5 mx-5 xl:mx-20 mt-20 xl:pt-20'>
                <div className="flex flex-col xl:flex-row justify-between gap-5">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-3xl font-bold'>{property.pName}</h1>
                        <div className='flex gap-1 xl:gap-5 flex-wrap'>
                            <span>{property.Address}</span>
                            <span className='text-gray-500 font-extralight'>|</span>
                            <span className='text-deep-orange-500'>{property.status}</span>
                            <span className='text-gray-500 font-extralight'>|</span>
                            <span className='flex items-center gap-2 hover:text-deep-orange-500 duration-300'><BiTimeFive />{new Date().getFullYear() - property.buildYear} year ago</span>
                            <span className='text-gray-500 font-extralight'>|</span>
                            <span className='flex  items-center gap-2 hover:text-deep-orange-500 duration-300'><FiExternalLink /> 8721</span>
                        </div>
                        <span className="flex text-sm gap-5">
                            <span className="flex items-center"><BiBed />{property.bedroom}</span>
                            <span className="flex items-center"><BiBath />{property.bath}</span>
                            <span className="flex items-center"><TbRulerMeasure />{property.pSize}</span>
                        </span>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className='flex gap-2'>
                            <span className='border border-black px-2 p-1 flex justify-center items-center rounded-lg cursor-pointer'><AiOutlineHeart /></span>
                            <span className='border border-black px-2 p-1 flex justify-center items-center rounded-lg cursor-pointer'><BiShareAlt /></span>
                        </div>
                        <div>
                            <span className='text-xl font-bold'>{Properties.price}</span>
                        </div>
                        <span>{property.pSize}</span>
                    </div>
                </div>

                {property.p_Images.length > 0 ? (
                    <div className="images flex flex-col xl:flex-row justify-evenly gap-5">
                        <div className='w-auto overflow-hidden rounded-lg'>
                            <img src={property.p_Images[0].url} alt="1" className=' hover:scale-110 hover:-rotate-2 duration-300' />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {Singleproperties.Images.slice(1).map((element) => (
                                <div className='w-auto overflow-hidden rounded-lg' key={element.id}>
                                    <img src={element.img} alt={element.id} className='rounded-lg hover:scale-125 hover:-rotate-6 duration-300' />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h1>No Images here to show</h1>
                )}

                <div className="relative flex flex-col xl:flex-row justify-evenly gap-5 my-5 min-h-fit max-h-fit">
                    <div className="w-full xl:w-2/3 overflow-y-auto min-h-full">
                        <div className='filter shadow-xl rounded-2xl p-5'>
                            <h1 className='font-bold text-xl my-3'>Overview</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {
                                    Singleproperties.Property.map((element) => {
                                        let Icon = element.icon;
                                        return (
                                            <div className="grid grid-rows-3 grid-flow-col border p-4" key={element.id}>
                                                <div className="flex items-center justify-center row-span-3 ">
                                                    <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><Icon></Icon></h1>
                                                </div>
                                                <div className="flex items-start justify-center col-span-2">
                                                    <h1 className="text-xl font-semibold">{element.name}</h1>
                                                </div>
                                                <div className="flex items-end justify-center row-span-2 col-span-2">
                                                    <h1 className="text-xl">{element.text}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='filter shadow-xl rounded-2xl h-100 p-5'>
                            <h1 className='font-bold text-xl my-3'>Property Description</h1>
                            <p className='text-justify'>{property.desc}</p>

                            <h1 className='font-bold text-xl my-3'>Property Details</h1>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                <div className='flex'><span className='font-semibold basis-1/2'>Garage:</span>  <span className='basis-1/2'>{property.garage}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Price:</span>  <span className='basis-1/2'>{property.price}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Property Size:</span>  <span className='basis-1/2'>{property.pSize}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Year Built:</span>  <span className='basis-1/2'>{property.buildYear}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Bathrooms:</span>  <span className='basis-1/2'>{property.bath}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Property Type:</span>  <span className='basis-1/2'>{property.propertyType}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Bedrooms:</span>  <span className='basis-1/2'>{property.bedroom}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Property Status:</span>  <span className='basis-1/2'>{property.status}</span></div>
                            </div>
                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Address</h1>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                <div className='flex'><span className='font-semibold basis-1/2'>Address:</span><span className='basis-1/2'>{property.Address}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Zip/Postal Code:</span>  <span className='basis-1/2'>{property.ZipCode}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>City:</span>  <span className='basis-1/2'>{property.city}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>State:</span>  <span className='basis-1/2'>{property.state}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Country:</span>  <span className='basis-1/2'>{property.country}</span></div>
                            </div>
                            <div><iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2547158278226!2d73.91419611127971!3d18.562551782466336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1681696533582!5m2!1sen!2sin"
                                allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" className='w-full h-full xl:w-[740px] xl:h-[250px]'></iframe>
                            </div>
                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Features & Amenities</h1>
                            {property.amenities.length > 0 ? (<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 list-disc mx-5">
                                {
                                    property.amenities.map((element) => {
                                        return (
                                            <li>{element}</li>
                                        )
                                    })
                                }
                            </ul>
                            ) : (
                                <h1>No Amenites here to present</h1>
                            )}
                        </div>
                        Review Section
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <div className="flex flex-col xl:flex-row gap-5  items-center justify-between">
                                <div className="flex items-center justify-evenly gap-3"><AiFillStar /> <span>5.0</span> <span>•</span><span>3 reviews</span></div>
                                <div className='flex items-center gap-1 xl:gap-3 justify-evenly'>Sort by : <span>
                                    <Select label=''>
                                        <Option>Newest</Option>
                                        <Option>Best Seller</Option>
                                        <Option>Best Match</Option>
                                        <Option>Price Low</Option>
                                        <Option>Price High</Option>
                                    </Select>
                                </span></div>
                            </div>
                            <div className='flex flex-col gap-10'>
                                {
                                    SingleProperty.Reviews.map((element) => {
                                        return (
                                            <div className='flex flex-col gap-5' key={element.id}>
                                                <div className="flex flex-col xl:flex-row justify-start xl:justify-between">
                                                    <div className="grid grid-cols-2 xl:gap-x-4 xl:gap-y-1">
                                                        <div className="row-span-2 flex items-center justify-center">
                                                            <img src="/images/Images/Reviews/users/1.png" alt="" className='h-14 w-14  rounded-full border' />
                                                        </div>
                                                        <div className="row-span-1  flex items-center justify-center font-bold text-base">{element.userName}</div>
                                                        <div className="row-span-1 flex items-center justify-center">{element.reviewDate}</div>
                                                    </div>

                                                    <div>
                                                        <Rating value={element.reviewcount} readonly />
                                                    </div>
                                                </div>
                                                <p>{element.reviewmessage}</p>
                                                {element.images && (
                                                    <div className="grid grid-cols-2 gap-5 xl:grid-cols-6 xl:gap-x-0">
                                                        {element.images.map((element) => <img src={element.img} key={element.id} className='h-auto w-auto rounded-lg' />)}
                                                    </div>
                                                )}

                                                <div className="flex gap-3 text-gray-500"> <span className='flex items-center gap-2'><FaThumbsUp /> Helpful</span> <span className='flex items-center gap-2'><FaThumbsDown /> Not Helpful</span></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Leave a review</h1>
                            <form>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col xl:flex-row justify-evenly gap-5">
                                        <select label="Rating" className="bg-gray-100 px-80 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400" color='orange' onChange={(e) => { 
                                            setRating(parseInt(e.target.value))
                                        }}>
                                            <option>1 star</option>
                                            <option>2 star</option>
                                            <option>3 star</option>
                                            <option>4 star</option>
                                            <option>5 star</option>
                                        </select>
                                    </div>
                                    <Textarea size='lg' label='Review' color='orange' onChange={(e) => { setComment(e.target.value) }} />
                                </div>
                                <Button className="mt-6 bg-deep-orange-500" onClick={handleReviewClick}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/3 xl:sticky xl:bottom-0">
                        <div className='filter shadow-xl rounded-2xl p-5'>
                            <h1 className='font-bold text-xl my-3'>Contact</h1>
                            <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input size="lg" label="Name" color='orange' />
                                    <Input size="lg" label="phone" type='tel' color='orange' />
                                    <Input size="lg" label="Email" type='email' color='orange' />
                                    <Input type="password" size="lg" label="Password" color='orange' />
                                </div>
                                <Checkbox
                                    color='orange'
                                    label={
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="flex items-center font-normal"
                                        >
                                            I agree the
                                            <a
                                                href="#"
                                                className="font-medium transition-colors hover:text-gray-900"
                                            >
                                                &nbsp;Terms and Conditions
                                            </a>
                                        </Typography>
                                    }
                                    containerProps={{ className: "-ml-2.5" }}
                                />
                                <Button className="mt-6 bg-deep-orange-500" fullWidth>
                                    Submit
                                </Button>
                            </form>
                        </div>

                        <div className='filter shadow-xl rounded-2xl p-5'>
                            <h1 className='font-bold text-xl my-3'>Get More Information</h1>
                            <div className="flex gap-2 ">
                                <img src="/images/avtar.jpg" alt="" className='h-20 w-20 rounded-full' />
                                <div className="flex flex-col gap-2">
                                    <span className='font-bold'>Arlene McCoy</span>
                                    <span className='flex gap-2 text-deep-orange-500 items-center'><span><AiOutlinePhone /></span><span>(920) 012-3421</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nearbyhouse mx-5 xl:mx-20 my-10">
                <h1 className='text-3xl font-bold'>Nearby Similar Homes</h1>
                <div className='text-sm'>Aliquam lacinia diam quis lacus euismod</div>
                <Slider {...settings} className='w-full p-2 mt-6'>
                    {
                        Properties.map((element) => {
                            return (
                                <Link to="/singleproperty" className="flex flex-col" key={element.id}>
                                    <div className="relative w-fit h-fit overflow-hidden rounded-lg">
                                        <img src={element.img} alt={element.title} className="hover:scale-110 duration-300 transition-all transform hover:-rotate-1 rounded-xl" />
                                        <div className="absolute z-10 bottom-5 left-2 text-black bg-white p-2 rounded-lg font-semibold">{element.price} $/month</div>
                                    </div>
                                    <div className="my-2 flex flex-col gap-2">
                                        <span className="font-semibold text-start ml-2">{element.title}</span>
                                        <span className="font-light text-start ml-2 text-sm text-gray-600">{element.address.city},{element.address.country},{element.address.state}</span>
                                        <span className="flex justify-evenly text-sm">
                                            <span className="flex items-center"><BiBed />{element.bed} Bed</span>
                                            <span className="flex items-center"><BiBath />{element.bath} Bath</span>
                                            <span className="flex items-center"><TbRulerMeasure />{element.sqft} Sqft</span>
                                        </span>
                                        <hr className="border-gray-800" />
                                        <div className="flex justify-evenly">
                                            <span className="text-sm">{element.category}</span>
                                            <span className="text-sm">{element.year.startingyear}-{element.year.endingyear}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default Singleproperty