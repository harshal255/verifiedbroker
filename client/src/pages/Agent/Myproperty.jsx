import  { useEffect, useRef, useState } from 'react'
import DashbordHeader from '../../components/AgentDashboard/Header'
import { PencilIcon } from "@heroicons/react/24/solid";
import { AiOutlineDelete } from 'react-icons/ai';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'

const Myproperty = () => {
  const [AdminProperties, setAdminProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyTobeModify, setPropertyTobeModify] = useState(null);
  const [imagesTobeModify, setImagesTobeModify] = useState([]);

  const uId = localStorage.getItem('uId');

  const handleOpen = () => setOpen((cur) => !cur);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current.click(); // Simulate a click on the file input element
  };

  const handleFileInputChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setImagesTobeModify(filesArray);
    console.log("File array", filesArray);
    console.log(propertyTobeModify);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/properties/${uId}?page=${page}`,
        withCredentials: true,
      };

      await axios.request(config)
        .then((res) => {
          console.log(res.data.property);
          setAdminProperties(res.data.property);
        })
        .catch((err) => {
          toast.error(err.response.statusText);
          console.error("failed to fetch property details", err);
        });
    }

    fetchProperty();
  }, [page, uId]);

  const handleDeleteProperty = async (pId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/property/${pId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Product deleted successfully!');
      setAdminProperties((prevProperties) => prevProperties.filter((property) => property._id !== pId));
      console.log(response);
    } catch (error) {
      toast.error('Failed to delete Property');
      console.error('Failed to delete property:', error);
    }
  };

  const handleUpdateProperty = async () => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/update/property/${propertyTobeModify._id}`,
      withCredentials: true,
      data: propertyTobeModify,
    }
    await axios.request(config)
      .then((res) => {
        setAdminProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === propertyTobeModify._id ? res.data.property : property
          )
        );
        handleOpen();
        toast.success('Property Updated Succesfully')
      })
      .catch(
        (error) => {
          toast.error('Failed to Update Property');
          console.error('Failed to delete property:', error);
        }
      )
  };

  const handleUpdateImage = () => {
    let data = new FormData();

    if (imagesTobeModify) {
      imagesTobeModify.forEach((file) => {
        data.append(`propertyPhotos`, file);
      });
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/update/images/${propertyTobeModify._id}`,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        handleOpen();
        toast.success('Property Images Updated Succesfully');
      })
      .catch((error) => {
        toast.error('Failed to Update Images in Property');
        console.log(error);
      });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/properties/${uId}?keyword=${searchQuery}`,
      withCredentials: true,
    }

    await axios.request(config)
      .then((res) => {
        if (res.data.property.length > 0) {
          toast.success("Property Found");
          setAdminProperties(res.data.property);
        }
        else {
          toast.error("No result for " + searchQuery);
        }
      })
      .catch((err) => {
        toast.error(err.response.statusText);
        console.error("failed to fetch property", err);
      });
  }

  const handleFetchProperty = async (pId) => {
    console.log(pId);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/property/${pId}`,
      withCredentials: true,
    };

    await axios.request(config)
      .then((res) => {
        setPropertyTobeModify(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.statusText);
        console.error("failed to fetch property details", err);
      });
  }

  const AdminPropertyHead = ["Listings", "Status", "Edit", "Delete",];

  return (
    <>
      <Toaster position="top-center"></Toaster>
      <DashbordHeader></DashbordHeader>
      <div className="w-full xl:w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  My Properties
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  We are glad to see you again!
                </Typography>
              </div>
              <div className="flex flex-col xl:flex-row w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72 flex items-center justify-center gap-5">
                  <Input
                    label="search"

                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                    onKeyDown={handleKeyPress}
                  />

                  <IconButton color="orange" className='px-10'>
                    <MagnifyingGlassIcon className="h-5 w-5" onClick={handleSearch} />
                  </IconButton>
                </div>
              </div>
              {/* <div onClick={navigate("/agentdash/addnewproperty")}> */}
                <Button className="flex items-center gap-3" size="sm" color='orange'>
                  Add New Property
                </Button>
              {/* </div> */}
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {AdminPropertyHead.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AdminProperties.length === 0 ? (
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
                  AdminProperties.map(
                    (
                      {
                        _id,
                        pName,
                        p_Images,
                        city,
                        country,
                        state,
                        price,
                        status,
                      },
                      index
                    ) => {
                      const isLast = index === AdminProperties.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className='overflow-hidden rounded-lg'>
                                <img
                                  src={p_Images[0].url}
                                  alt={pName}
                                  className='hover:scale-105 duration-300 h-20 w-32'
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <span>{pName}</span>
                                <span className="font-light text-start ml-2 text-sm text-gray-600">
                                  {city}, {country}, {state}
                                </span>
                                <span className="font-bold text-start ml-2 text-sm">₹{price}/month</span>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={status}
                                color={
                                  status === "Published"
                                    ? "blue"
                                    : status === "Pending"
                                      ? "yellow"
                                      : "red"
                                }
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit Property">
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4" onClick={() => { handleFetchProperty(_id), handleOpen() }} />
                              </IconButton>
                            </Tooltip>
                          </td>
                          <td>
                            <Tooltip content="Delete Property">
                              <IconButton variant="text">
                                <AiOutlineDelete className="h-4 w-4" onClick={() => { handleDeleteProperty(_id) }} />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center gap-2 lg:gap-4 justify-center">
            <Button
              variant="text"
              color="orange"
              className="flex items-center gap-2 rounded-full"
              onClick={() => { setPage(page - 1) }}
              disabled={page === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-primary" /> Previous
            </Button>
            <Button
              variant="text"
              color="orange"
              className="flex items-center gap-2 rounded-full"
              onClick={() => { setPage(page + 1) }}
              disabled={page === 5}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-primary" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      {propertyTobeModify && (<Dialog
        size={"xl"}
        open={open}
        handler={handleOpen}
        className="bg-white shadow-none mx-0"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <DialogHeader variant="h5" color="pink-gray">
              Modify Property
            </DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
          </div>
          <div>
            <img
              alt="team"
              className="flex-shrink-0 my-4 w-[100px] h-[100px] object-cover object-center mb-4 m-auto hover:cursor-pointer"
              src={propertyTobeModify.p_Images[0].url}
              onClick={handleImageClick}
            />
            <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" multiple />
          </div>

          <DialogBody divider>
            <div className="grid grid-cols-3 gap-3">
              <Input color="orange" label="Property Name" value={propertyTobeModify.pName} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, pName: e.target.value })} />
              <Input color="orange" label="Description" value={propertyTobeModify.desc} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, desc: e.target.value })} />
              <Input color="orange" label="Build Year" value={propertyTobeModify.buildYear} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, buildYear: e.target.value })} />
              <Input color="orange" label="Property Size" value={propertyTobeModify.pSize} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, pSize: e.target.value })} />
              <Input color="orange" label="Garage" value={propertyTobeModify.garage} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, garage: e.target.value })} />
              <Input color="orange" label="Bed-Room" value={propertyTobeModify.bedroom} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, bedroom: e.target.value })} />
              <Input color="orange" label="Bath-Room" value={propertyTobeModify.bath} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, bath: e.target.value })} />
              <Input color="orange" label="Total-Rooms" value={propertyTobeModify.Rooms} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, Rooms: e.target.value })} />
              <Input color="orange" label="Property Type" value={propertyTobeModify.propertyType} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, propertyType: e.target.value })} />
              <Input color="orange" label="Status" value={propertyTobeModify.status} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, status: e.target.value })} />
              <Input color="orange" label="Price" value={propertyTobeModify.price} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, price: e.target.value })} />
              <Input color="orange" label="Address" value={propertyTobeModify.Address} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, Address: e.target.value })} />
              <Input color="orange" label="Pincode" value={propertyTobeModify.ZipCode} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, ZipCode: e.target.value })} />
              <Input color="orange" label="City" value={propertyTobeModify.city} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, city: e.target.value })} />
              <Input color="orange" label="State" value={propertyTobeModify.state} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, state: e.target.value })} />
              <Input color="orange" label="Country" value={propertyTobeModify.country} onChange={(e) => setPropertyTobeModify({ ...propertyTobeModify, country: e.target.value })} />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <button className="flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-green-700 duration-300 hover:translate-y-2 my-2" onClick={handleUpdateImage}>Update Images</button>
            <button className="flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-green-700 duration-300 hover:translate-y-2 my-2" onClick={handleUpdateProperty}>Update Property Data</button>
            <button className="flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-green-700 duration-300 hover:translate-y-2 my-2" onClick={() => { navigate("/agentdash/addnewproperty", { state: { pId: propertyTobeModify._id } }) }}>Update Amenities</button>
          </DialogFooter>
        </div>
      </Dialog>
      )
      }
    </>
  )
}

export default Myproperty
