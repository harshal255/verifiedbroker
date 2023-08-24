import { useEffect, useState } from 'react'
import {
    Input,
    Checkbox,
    Button,
    Typography,
    Rating,
    Textarea
} from "@material-tailwind/react";
import { BiBed, BiBath, BiHomeAlt2 } from 'react-icons/bi'
import { TbRulerMeasure } from 'react-icons/tb'
import { AiOutlineDelete, AiOutlinePhone } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiShareAlt, BiTimeFive } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom';
import Properties from '../api/Property';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'
import { MdDateRange, MdOutlineBedroomParent } from 'react-icons/md';
import { ImHome } from 'react-icons/im';




const Singleproperty = () => {

    const [property, setProperty] = useState(null);
    const [nearByProp, setNearByProp] = useState([]);
    const [broker, setBroker] = useState(null);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [latlng, setLatLng] = useState({
        lat: '',
        long: ''
    })
    const location = useLocation();
    const navigate = useNavigate();
    const pId = location.state?.pId;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propertyResponse = await axios.get(`http://localhost:3000/api/property/${pId}`, { withCredentials: true });
                const currentProperty = propertyResponse.data.data;
                console.log(currentProperty);
                setProperty(currentProperty);

                if (propertyResponse.data.data.broker_id) {
                    const brokerResponse = await axios.get(`http://localhost:3000/api/broker/${propertyResponse.data.data.broker_id}`);
                    setBroker(brokerResponse.data);
                }

                if (propertyResponse) {
                    const data = await axios.get('http://localhost:3000/api/property');
                    const allProperties = data.data.property;

                    const filteredNearbyProp = allProperties.filter(prop => prop._id !== currentProperty._id && prop.city === currentProperty.city);


                    setNearByProp(filteredNearbyProp);
                }



            } catch (error) {
                toast.error(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Failed to fetch property and/or broker details', error);
            }
        };
        fetchData();
    }, [pId]);

    useEffect(() => {
        const fetchlatlng = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/latlng/${property.Address},${property.city}`,
                withCredentials: true,
            };

            await axios.request(config)
                .then((res) => {
                    setLatLng({
                        lat: res.data.data.latitude,
                        long: res.data.data.longitude
                    })
                })
                .catch((err) => {
                    toast.error(err.response.statusText);
                    console.error("failed to fetch property details", err);
                });
        }
        fetchlatlng();

    }, [property])


    const handleReviewClick = async () => {
        const data = {
            rating: rating,
            comment: comment,
        };
        const uId = localStorage.getItem('uId');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/${uId}/review/${pId}`,
            withCredentials: true,
            data: data,
        }

        await axios.request(config)
            .then((res) => {
                console.log(res.data);
                toast.success("Review Added Successfully");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                console.error("Review Post error", err);
            });
    }

    const handleDeleteReview = async (uId) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/${uId}/review/${pId}`,
            withCredentials: true,
        };

        await axios.request(config)
            .then(() => {
                toast.success("Review Deleted Successfully");
            })
            .catch((error) => {
                toast.error("Review Deletion error");
                console.log(error);
            });
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

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
                            {property.p_Images.slice(1).map((element) => (
                                <div className='w-auto overflow-hidden rounded-lg' key={element.id}>
                                    <img src={element.url} alt={element.id} className='rounded-lg hover:scale-125 hover:-rotate-6 duration-300' />
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
                                <div className="grid grid-rows-3 grid-flow-col border p-4" key={property._id}>
                                    <div className="flex items-center justify-center row-span-3 ">
                                        <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><MdOutlineBedroomParent></MdOutlineBedroomParent></h1>
                                    </div>
                                    <div className="flex items-start justify-center col-span-2">
                                        <h1 className="text-xl font-semibold">Bedroom</h1>
                                    </div>
                                    <div className="flex items-end justify-center row-span-2 col-span-2">
                                        <h1 className="text-xl">{property.bedroom}</h1>
                                    </div>
                                </div>
                                <div className="grid grid-rows-3 grid-flow-col border p-4" key={property._id}>
                                    <div className="flex items-center justify-center row-span-3 ">
                                        <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><BiBath></BiBath></h1>
                                    </div>
                                    <div className="flex items-start justify-center col-span-2">
                                        <h1 className="text-xl font-semibold">Bath</h1>
                                    </div>
                                    <div className="flex items-end justify-center row-span-2 col-span-2">
                                        <h1 className="text-xl">{property.bath}</h1>
                                    </div>
                                </div>
                                <div className="grid grid-rows-3 grid-flow-col border p-4" key={property._id}>
                                    <div className="flex items-center justify-center row-span-3 ">
                                        <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><MdDateRange></MdDateRange></h1>
                                    </div>
                                    <div className="flex items-start justify-center col-span-2">
                                        <h1 className="text-xl font-semibold">Year Built</h1>
                                    </div>
                                    <div className="flex items-end justify-center row-span-2 col-span-2">
                                        <h1 className="text-xl">{property.buildYear}</h1>
                                    </div>
                                </div>
                                <div className="grid grid-rows-3 grid-flow-col border p-4" key={property._id}>
                                    <div className="flex items-center justify-center row-span-3 ">
                                        <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><ImHome></ImHome></h1>
                                    </div>
                                    <div className="flex items-start justify-center col-span-2">
                                        <h1 className="text-xl font-semibold">Garage</h1>
                                    </div>
                                    <div className="flex items-end justify-center row-span-2 col-span-2">
                                        <h1 className="text-xl">{property.garage}</h1>
                                    </div>
                                </div>
                                <div className="grid grid-rows-3 grid-flow-col border p-4" key={property._id}>
                                    <div className="flex items-center justify-center row-span-3 ">
                                        <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><TbRulerMeasure></TbRulerMeasure></h1>
                                    </div>
                                    <div className="flex items-start justify-center col-span-2">
                                        <h1 className="text-xl font-semibold">Sqft</h1>
                                    </div>
                                    <div className="flex items-end justify-center row-span-2 col-span-2">
                                        <h1 className="text-xl">{property.pSize}</h1>
                                    </div>
                                </div>
                                <div className="grid grid-rows-3 grid-flow-col border p-4" key={property._id}>
                                    <div className="flex items-center justify-center row-span-3 ">
                                        <h1 className="text-3xl border-2 p-3 border-black rounded-lg"><BiHomeAlt2></BiHomeAlt2></h1>
                                    </div>
                                    <div className="flex items-start justify-center col-span-2">
                                        <h1 className="text-xl font-semibold">Property Type</h1>
                                    </div>
                                    <div className="flex items-end justify-center row-span-2 col-span-2">
                                        <h1 className="text-xl">{property.propertyType}</h1>
                                    </div>
                                </div>
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
                                src={`https://maps.google.com/maps?q=${latlng.lat},${latlng.long}&hl=es;z=14&output=embed`}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when -downgrade"
                                className='w-full h-full xl:w-[740px] xl:h-[250px]'
                            ></iframe>
                            </div>
                        </div>
                        <div className='filter shadow-xl rounded-2xl p-5 flex flex-col xl:gap-10'>
                            <h1 className='font-bold text-xl my-3'>Features & Amenities</h1>
                            {property.amenities.length > 0 ? (<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 list-disc mx-5">
                                {
                                    property.amenities.map((element) => {
                                        return (
                                            <li key={element.id}>{element}</li>
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
                                <div className="flex items-center justify-evenly gap-3"><AiFillStar /> <span>{property.ratings}</span> <span>•</span><span>{property.reviews.length}</span></div>
                            </div>
                            <div className='flex flex-col gap-10'>
                                {property.reviews.length > 0 ? (
                                    property.reviews.map((element) => (
                                        <div className='flex flex-col gap-5' key={element.id}>
                                            <div className="flex flex-col xl:flex-row justify-start xl:justify-between">
                                                <div className="grid grid-cols-2 xl:gap-x-4 xl:gap-y-1">
                                                    <div className="row-span-1  flex items-center justify-center font-bold text-base">{element.userName}</div>
                                                    <div className="row-span-1 flex items-center justify-center">{formatDate(element.createdAt)}</div>
                                                </div>
                                                <div>
                                                    <Rating value={element.rating} readonly />
                                                    {localStorage.getItem('uId') === element.userId && (
                                                        <AiOutlineDelete className="text-xl" onClick={() => handleDeleteReview(element.userId)} />
                                                    )}
                                                </div>
                                            </div>
                                            <p>{element.comment}</p>
                                        </div>
                                    ))

                                ) :
                                    (
                                        <p>Be The First for Review 🌟</p>
                                    )
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
                            <div className="flex gap-2">
                                {broker && (
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={broker.broker.brokersDetails.photo.url}
                                            alt="avatar"
                                            className="h-20 w-20 rounded-full"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <span className="font-bold">{broker.broker.name}</span>
                                            <span className="flex gap-2 text-deep-orange-500 items-center">
                                                <span>
                                                    <AiOutlinePhone />
                                                </span>
                                                <span>{broker.broker.brokersDetails.phone}</span>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="nearbyhouse mx-5 xl:mx-20 my-10">
                <h1 className='text-3xl font-bold'>Nearby Similar Homes</h1>
                {nearByProp.length < 1 ? (
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="flex justify-center items-center">
                                <img
                                    src="/gifs/notFoundAnimation.gif"
                                    alt="Oops, nothing there"
                                    className="w-48 h-auto"
                                />
                            </div>
                        </td>
                    </tr>
                ) : (
                    <div className="flex flex-wrap gap-5 justify-around">
                        {nearByProp.map((element) => (
                            <div key={element._id} onClick={() => navigate("/singleproperty", { state: { pId: element._id } })}>
                                <div className="relative w-fit h-fit overflow-hidden rounded-lg">
                                    <img
                                        src={element.p_Images[0].url}
                                        alt={element.pName}
                                        className="hover:scale-110 duration-300 transition-all transform hover:-rotate-1 rounded-xl"
                                    />
                                    <div className="absolute z-10 bottom-5 left-2 text-black bg-white p-2 rounded-lg font-semibold">
                                        {element.price} ₹/month
                                    </div>
                                </div>
                                <div className="my-2 flex flex-col gap-2">
                                    <span className="font-semibold text-start ml-2">{element.pName}</span>
                                    <span className="font-light text-start ml-2 text-sm text-gray-600">
                                        {element.city}, {element.country}, {element.state}
                                    </span>
                                    <span className="flex justify-evenly text-sm">
                                        <span className="flex items-center"><BiBed />{element.bedroom} Bed</span>
                                        <span className="flex items-center"><BiBath />{element.bath} Bath</span>
                                        <span className="flex items-center"><TbRulerMeasure />{element.pSize} Sqft</span>
                                    </span>
                                    <hr className="border-gray-800" />
                                    <div className="flex justify-evenly">
                                        <span className="text-sm">{element.propertyType}</span>
                                        <span className="text-sm">{new Date().getFullYear() - element.buildYear} years ago</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                )}
            </div>
        </>
    )
}

export default Singleproperty