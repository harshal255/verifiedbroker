import { AiFillStar } from 'react-icons/ai';
import { BiSolidPhoneCall } from 'react-icons/bi'
import { BsFillPhoneFill } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiBed, BiBath } from 'react-icons/bi';
import { TbRulerMeasure } from 'react-icons/tb';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Rating,
  Avatar
} from "@material-tailwind/react";
import axios from 'axios';
import AuthContext from '../pages/AuthContext'
import { Toaster, toast } from 'react-hot-toast';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {MdVerified} from 'react-icons/md';

const Oneajent = () => {

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [singleBroker, setSingleBroker] = useState(null);

  const [properties, setProperties] = useState([]);

  const ratings = ["1", "2", "3", "4", "5"];

  const [selectRating, setSelectRating] = useState({
    rating: ratings[0],
    comment: ''
  });

  const [contact, setContact] = useState({
    name: '',
    userId: '',
    brokerId: '',
    message: '',
  });

  useEffect(() => {
    if (user && singleBroker) {
      setContact((prev) => ({
        ...prev,
        userId: user.email,
        brokerId: singleBroker.email
      }))
    }
  }, [user])

  const location = useLocation();

  const brokerId = location.state?.uId;

  useEffect(() => {
    async function fetchBrokerData() {
      try {
        const response = await axios.get(`https://v-bbackend.vercel.app/api/broker/${brokerId}`, { withCredentials: true });
        setSingleBroker(response.data.broker);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchPropertiesData() {
      try {
        const response = await axios.get(`https://v-bbackend.vercel.app/api/properties/${brokerId}`, { withCredentials: true });
        setProperties(response.data.property);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBrokerData();
    fetchPropertiesData();
  }, [brokerId]);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const getYearDifference = (createdAt) => {
    const inputYear = new Date(createdAt).getFullYear();
    return getCurrentYear() - inputYear;
  };

  const getDate = (date) => {
    const parsedDate = new Date(date);
    const dateOnly = parsedDate.toLocaleDateString();
    return dateOnly;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectRating((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  console.log(selectRating);

  const handleSubmit = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://v-bbackend.vercel.app/api/${user._id}/reviewBroker/${singleBroker._id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: selectRating
    };

    axios.request(config)
      .then((response) => {
        setTimeout(() => {
          if (user._id === singleBroker._id) {
            setUser(response.data.message);
          }
          setSingleBroker(response.data.message)
        }, 1000)
        toast.success("Review Added Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  const handleDelete = () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://v-bbackend.vercel.app/api/${user._id}/reviewBroker/${singleBroker._id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: selectRating
    };

    axios.request(config)
      .then((response) => {
        setTimeout(() => {
          setSingleBroker(response.data.message)
        }, 1000)
        toast.success("Review Deleted Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  const handleContact = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // console.log(contact);

  const handleContactSubmit = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://v-bbackend.vercel.app/api/sendMail`,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: contact
    };

    axios.request(config)
      .then((response) => {
        toast.success(response.data.message);
        if (user && singleBroker) {
          setContact(() => ({
            name: '',
            message: '',
            userId: user.email,
            brokerId: singleBroker.email
          }))
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }


  return (
    <>
      <Toaster position='top-center'></Toaster>
      <div className='flex h-full justify-start border border-black flex-col xl:mx-20'>
        {singleBroker != null &&
          <>
            <div className="bg-red-50/50 w-full max-h-fit xl:h-56 mt-20">
              <div className="flex flex-col xl:flex-row m-10 gap-10 items-center" >
                <Avatar src={singleBroker.brokersDetails.photo.url} alt="avatar" className='rounded-full h-40 w-40' />
                <div className="flex flex-col gap-2">
                  <h1 className='text-3xl font-bold flex justify-center items-center gap-5'>{singleBroker.name}
                  <MdVerified className="text-deep-orange-500" />
                  </h1>
                  <span className='text-sm text-gray-600'>Experience :  <b>{singleBroker.brokersDetails.experience}</b></span>
                  <div className="flex text-sm gap-2 flex-wrap items-center justify-center">
                    <span className='flex gap-1'><AiFillStar className='h-3 w-3 text-yellow-700' /> {singleBroker.brokersDetails.ratings.toFixed(1)} · </span>
                    <span>{singleBroker.brokersDetails.numOfReviews} Reviews</span>
                    <span>|</span>
                    <span className='flex gap-2 items-center'><BiSolidPhoneCall />{singleBroker.brokersDetails.phone}</span>
                    <span>|</span>
                    <span className='flex gap-2 items-center'><BsFillPhoneFill />{singleBroker.brokersDetails.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row">
              <div className="w-full xl:w-2/3 border border-black xl:m-5 flex flex-col gap-3">
                <h1 className='text-start mx-5 font-bold '>About {singleBroker.name}</h1>
                <p className='mx-5 text-justify'>{singleBroker.brokersDetails.about}</p>
                <hr className='border-gray-500' />
                {properties.length == 0 ? <div className="flex items-center justify-center h-64">
                  <div className='text-3xl flex my-5 text-center'>
                    Please Login To See Property
                  </div>
                </div> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 m-5">
                    {
                      properties.map(
                        (element) => {
                          return (
                            <div className="flex flex-col" key={element._id} onClick={() => navigate("/singleproperty", { state: { pId: element._id } })}>
                              <div className="relative w-fit h-fit overflow-hidden rounded-lg">
                                <img
                                  src={element.p_Images[0].url}
                                  alt={element.pName}
                                  className="hover:scale-110 duration-300 transition-all transform hover:-rotate-1 rounded-xl h-[250px] w-[415px]"
                                />
                                <div className="absolute z-10 bottom-5 left-2 text-black bg-white p-2 rounded-lg font-semibold">
                                  {element.price} ₹/month
                                </div>
                              </div>
                              <div className="my-2 flex flex-col gap-2">
                                <span className="font-semibold text-start ml-2">{element.pName}</span>
                                <span className="font-light text-start ml-2 text-sm text-gray-600">
                                  {element.city},{element.country},
                                  {element.state}
                                </span>
                                <span className="flex justify-evenly text-sm">
                                  <span className="flex items-center">
                                    <BiBed />
                                    {element.bedroom} Bed
                                  </span>
                                  <span className="flex items-center">
                                    <BiBath />
                                    {element.bath} Bath
                                  </span>
                                  <span className="flex items-center">
                                    <TbRulerMeasure />
                                    {element.pSize} Sqft
                                  </span>
                                </span>
                                <hr className="border-gray-800" />
                                <div className="flex justify-evenly">
                                  <span className="text-sm">{element.status}</span>
                                  <span className="text-sm">
                                    {getYearDifference(element.createdAt) !== 0 ? getYearDifference(element.createdAt) + "years ago" : "This Year"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    
                  </div>
                )}

              </div>

              <div className="w-full flex flex-col xl:w-1/3 xl:pr-10 gap-5">
                <Card color="transparent" shadow={false} className='border border-black w-[85vw] xl:w-fit xl:px-10 py-10 xl:-mt-28 bg-white'>
                  <Typography variant="h4" color="blue-gray">
                    Contact Form
                  </Typography>

                  <form className="mt-8 mb-2 max-w-fit xl:w-96 flex flex-col gap-3 ">
                    <div className="mb-4 flex flex-col gap-2 xl:gap-6 items-center justify-center ml-10 xl:ml-0">
                      <div className="w-36 xl:w-72 text-center"><Input label="Name" name='name' value={contact.name} onChange={handleContact} /></div>
                      <div className="w-36 xl:w-72 text-center"><Input label="Email" value={user && user.email} /></div>
                      <div className="w-36 xl:w-72 text-center">
                        <Textarea label="Message" name='message' value={contact.message} onChange={handleContact} />
                      </div>
                    </div>

                    <Button className="mt-6 w-32 ml-10 xl:ml-0" onClick={handleContactSubmit} fullWidth>
                      Send Mail
                    </Button>
                  </form>
                </Card>

                <Card className='flex flex-col gap-4 justify-center items-center bg-white py-10 border border-black'>
                  <h1 className='text-xl xl:text-3xl font-semibold text-center xl:text-start'>Agency Information</h1>
                  <Typography className="justify-evenly"><b className='font-semibold'>Broker address : </b>{singleBroker.brokersDetails.address}</Typography>
                  <Typography className="justify-evenly"><b className='font-semibold'>Mobile : </b>{singleBroker.brokersDetails.phone}</Typography>
                </Card>
              </div>

            </div>
            <div className="w-full">

              <div className='mx-10 flex flex-col xl:flex-row justify-between'><div className='flex items-center gap-5'><AiFillStar />
                {singleBroker.brokersDetails.ratings.toFixed(1)} · {singleBroker.brokersDetails.numOfReviews} Reviews</div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 m-5 ">
                {singleBroker.brokersDetails.reviews.length !== 0 ? (
                  singleBroker.brokersDetails.reviews.map((element) => (
                    <article className="lg:w-1/2 m-auto text-start my-5" key={element._id}>
                      <div className="flex items-center mb-4 space-x-4 ">
                        <Avatar
                          className="w-10 h-10 rounded-full"
                          src="https://res.cloudinary.com/dijdjkiqv/image/upload/v1692686408/Avatar/pyvclwz03vy0ty88cunf.jpg"
                          alt=""
                        />
                        <div className="space-y-1 flex gap-5 items-center justify-center font-medium dark:text-white">
                          <p>{element.userName}</p>
                          {user && user._id === element.userId && <DeleteOutlineIcon onClick={handleDelete} />}
                        </div>
                      </div>
                      <Rating value={element.rating} readonly />
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>Reviewed on {getDate(element.createdAt)}</p>
                      </footer>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {element.comment}
                      </p>
                      <p className="mb-3 text-gray-500 dark:text-gray-400">
                        {element.additionalText}
                      </p>
                    </article>
                  ))
                ) : (
                  <article className="lg:w-1/2 m-auto my-5">
                    <div className="flex items-center justify-center mb-4 space-x-4">
                      <img
                        src="/gifs/notFoundAnimation.gif"
                        alt="Oops, nothing there"
                        className="w-48 h-auto"
                      />
                    </div>
                  </article>
                )}
              </div>

              <hr />


              {/* for Review */}
              <div className="flex flex-col gap-5 items-center justify-center my-10 w-full -ml-10">
                <h1 className='font-bold text-3xl text-start'>Leave a Review</h1>
                <div className="flex items-center justify-between w-32 xl:w-96 gap-2">
                  <span className="w-1/2">Rating</span>
                  <select className='w-full h-8 border-2 border-grey-600 rounded-md' name='rating' value={selectRating.rating} onChange={handleChange}>
                    {ratings.map((r) => (
                      // console.log(r);
                      <option value={r} key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="w-40 xl:w-96 text-center">
                  <Textarea label="review" name='comment' color='red' value={selectRating.comment} onChange={handleChange} />
                </div>
                <Button className="w-32 text-center bg-red-600" onClick={handleSubmit} fullWidth>
                  Add Review
                </Button>
              </div>

            </div>
          </>
        }

      </div >
    </>
  )
}

export default Oneajent