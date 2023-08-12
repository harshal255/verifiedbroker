import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody,
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
import { Link } from 'react-router-dom';
import Properties from '../api/Property';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-3 w-3 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

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

    const firstImage = Singleproperties.Images[0].img;

    //for Accordion
    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <>
            <div className='flex flex-col gap-5 mx-5 xl:mx-20 mt-20 xl:pt-20'>
                <div className="flex flex-col xl:flex-row justify-between gap-5">
                    <div className="flex flex-col gap-5">
                        <h1 className='text-3xl font-bold'>Awesome Interior Apartment</h1>
                        <div className='flex gap-1 xl:gap-5 flex-wrap'>
                            <span>4834 N 10th St, Philadelphia, PA 19141</span>
                            <span className='text-gray-500 font-extralight'>|</span>
                            <span className='text-deep-orange-500'>For sale</span>
                            <span className='text-gray-500 font-extralight'>|</span>
                            <span className='flex items-center gap-2 hover:text-deep-orange-500 duration-300'><BiTimeFive /> 1 years ago</span>
                            <span className='text-gray-500 font-extralight'>|</span>
                            <span className='flex  items-center gap-2 hover:text-deep-orange-500 duration-300'><FiExternalLink /> 8721</span>
                        </div>
                        <span className="flex text-sm gap-5">
                            <span className="flex items-center"><BiBed />5 Bed</span>
                            <span className="flex items-center"><BiBath />1 Bath</span>
                            <span className="flex items-center"><TbRulerMeasure />3000 Sqft</span>
                        </span>

                    </div>
                    <div className="flex flex-col gap-5">

                        <div className='flex gap-2'>
                            <span className='border border-black px-2 p-1 flex justify-center items-center rounded-lg cursor-pointer'><AiOutlineHeart /></span>
                            <span className='border border-black px-2 p-1 flex justify-center items-center rounded-lg cursor-pointer'><BiShareAlt /></span>
                        </div>
                        <div>
                            <span className='text-xl font-bold'>$958,000</span>
                        </div>
                        <span>$2,300/sq ft</span>

                    </div>
                </div>





                <div className="images flex flex-col xl:flex-row justify-evenly gap-5">
                    <div className='w-auto overflow-hidden rounded-lg'>
                        <img src={firstImage} alt="1" className=' hover:scale-110 hover:-rotate-2 duration-300' />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        {
                            Singleproperties.Images.slice(1).map((element) => {
                                return (
                                    <div className='w-auto overflow-hidden rounded-lg ' key={element.id}>
                                        <img src={element.img} alt={element.id} className='rounded-lg hover:scale-125 hover:-rotate-6 duration-300' />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="relative flex flex-col xl:flex-row justify-evenly gap-5 my-5 min-h-fit max-h-fit">
                    <div className="w-full xl:w-2/3 overflow-y-auto min-h-full">
                        <div className='filter shadow-xl rounded-2xl p-5'>
                            <h1 className='font-bold text-xl my-3'>Overview</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {
                                    Singleproperties.Property.map((element) => {
                                        let Icon = element.icon;
                                        return (
                                            <div class="grid grid-rows-3 grid-flow-col border p-4" key={element.id}>
                                                <div class="flex items-center justify-center row-span-3 ">
                                                    <h1 class="text-3xl border-2 p-3 border-black rounded-lg"><Icon></Icon></h1>
                                                </div>
                                                <div class="flex items-start justify-center col-span-2">
                                                    <h1 class="text-xl font-semibold">{element.name}</h1>
                                                </div>
                                                <div class="flex items-end justify-center row-span-2 col-span-2">
                                                    <h1 class="text-xl">{element.text}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='filter shadow-xl rounded-2xl h-100 p-5'>
                            <h1 className='font-bold text-xl my-3'>Property Description</h1>
                            <p className='text-justify'>This 3-bed with a loft, 2-bath home in the gated community of The Hideout has it all. From the open floor plan to the abundance of light from the windows, this home is perfect for entertaining. The living room and dining room have vaulted ceilings and a beautiful fireplace. You will love spending time on the deck taking in the beautiful views. In the kitchen, you'll find stainless steel appliances and a tile backsplash, as well as a breakfast bar.

                                Placeholder content for this accordion, which is intended to demonstrate the class. This is the first item's accordion body you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need</p>

                            <h1 className='font-bold text-xl my-3'>Property Details</h1>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                <div className='flex'><span className='font-semibold basis-1/2'>Property ID:</span><span className='basis-1/2'>{Singleproperties.PropertyDetails.PropertyID}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Garage:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.Garage}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Price:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.Price}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Garage Size:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.GarageSize}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Property Size:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.PropertySize}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Year Built:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.YearBuilt}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Bathrooms:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.Bathrooms}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Property Type:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.PropertyType}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Bedrooms:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.Bedrooms}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Property Status:</span>  <span className='basis-1/2'>{Singleproperties.PropertyDetails.PropertyStatus}</span></div>
                            </div>
                        </div>

                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Address</h1>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                <div className='flex'><span className='font-semibold basis-1/2'>Address:</span><span className='basis-1/2'>{Singleproperties.Address.Address}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Zip/Postal Code:</span>  <span className='basis-1/2'>{Singleproperties.Address.ZipPostalCode}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>City:</span>  <span className='basis-1/2'>{Singleproperties.Address.City}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Area:</span>  <span className='basis-1/2'>{Singleproperties.Address.Area}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>State:</span>  <span className='basis-1/2'>{Singleproperties.Address.State}</span></div>
                                <div className='flex'><span className='font-semibold basis-1/2'>Country:</span>  <span className='basis-1/2'>{Singleproperties.Address.Country}</span></div>
                            </div>
                            <div><iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2547158278226!2d73.91419611127971!3d18.562551782466336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1681696533582!5m2!1sen!2sin"
                                allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" className='w-full h-full xl:w-[740px] xl:h-[250px]'></iframe>
                            </div>

                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Features & Amenities</h1>

                            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 list-disc mx-5">
                                {
                                    Singleproperties.Features.map((element) => {
                                        return (
                                            <li key={element.id}>{element.feature}</li>
                                        )
                                    })

                                }
                            </ul>
                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Floor Plans</h1>

                            {
                                SingleProperty.Floor.map((element) => {
                                    return (
                                        <Accordion open={open === element.id} icon={<Icon id={element.id} open={open} />} key={element.id}>
                                            <AccordionHeader onClick={() => handleOpen(element.id)} className='flex flex-wrap justify-between gap-5 text-sm'>

                                                <div className='text-base'>{element.floor}</div>
                                                <div className='flex gap-2 xl:gap-5 flex-wrap'>
                                                    <span> <span className='font-semibold'>Size:</span> <span>{element.size}</span></span>
                                                    <span><span className='font-semibold'>Bedrooms:</span> <span>{element.bedrooms}</span></span>
                                                    <span><span className='font-semibold'>Bathrooms:</span>{element.bathrooms}</span>
                                                    <span><span className='font-semibold'>Prices:</span> {element.price} $</span>
                                                </div>

                                            </AccordionHeader>
                                            <AccordionBody className="flex justify-center">
                                                <img src={element.img} alt="Harshal" className=' w-auto h-auto xl:w-3/4 xl:h-3/4' />
                                            </AccordionBody>
                                        </Accordion>
                                    )
                                })
                            }

                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <div className="flex flex-col xl:flex-row gap-5  items-center justify-between">
                                <div className="flex items-center justify-evenly gap-3"><AiFillStar /> <span>5.0</span> <span>•</span><span>3 reviews</span></div>
                                <div className='flex items-center gap-1 xl:gap-3 justify-evenly'>Sort by : <span>
                                    <Select size="sm" label=''>
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
                                                    <div class="grid grid-cols-2 xl:gap-x-4 xl:gap-y-1">
                                                        <div class="row-span-2 flex items-center justify-center">
                                                            <img src="/images/Images/Reviews/users/1.png" alt="" className='h-14 w-14  rounded-full border' />
                                                        </div>
                                                        <div class="row-span-1  flex items-center justify-center font-bold text-base">{element.userName}</div>
                                                        <div class="row-span-1 flex items-center justify-center">{element.reviewDate}</div>
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

                                    <Input size="lg" label="Email" color='orange' className='w-full' />
                                    <div className="flex flex-col xl:flex-row justify-evenly gap-5">
                                        <Input size="lg" label="Title" color='orange' className='w-full' />
                                        <Select label="Rating" color='orange'>
                                            <Option>1 star</Option>
                                            <Option>2 star</Option>
                                            <Option>3 star</Option>
                                            <Option>4 star</Option>
                                            <Option>5 star</Option>
                                        </Select>
                                    </div>
                                    <input type="file" multiple />
                                    <Textarea size='lg' label='Review' color='orange' />

                                </div>


                                <Button className="mt-6 bg-deep-orange-500">
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