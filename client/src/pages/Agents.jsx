import { useEffect, useState } from 'react';
import { Avatar, Breadcrumbs } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

import { MdVerified } from 'react-icons/md';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {toast,Toaster} from 'react-hot-toast';




const Agents = () => {


  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');

  // console.log(page);


  const [brokers, setBrokers] = useState(null);

  console.log(brokers);

  const navigate = useNavigate();

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/brokers?page=${page}`,
      withCredentials: true
    };

    axios.request(config)
      .then((response) => {
        setBrokers(response.data.broker);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page])

  const handleSearch = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/brokers?keyword=${searchQuery}`,
      withCredentials: true,
    }

    await axios.request(config)
      .then((res) => {
        if (res.data.broker.length > 0) {
          toast.success("Broker Found");
          setBrokers(res.data.broker);
        }
        else {
          toast.error("No result for " + searchQuery);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.error("failed to fetch broker", err);
      });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    <>
    <Toaster position='top-center'></Toaster>
    <div className="pt-0 mt-20 xl:mx-20">
      <h1 className="text-4xl text-start">Agents</h1>
      <Breadcrumbs className="my-2">
        <Link to="/" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <Link to="/agents" className="opacity-60">
          <span>Agents</span>
        </Link>
      </Breadcrumbs>

      <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <Input
            label="search"
            color="orange"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value) }}
            onKeyDown={handleKeyPress}
          />

          <IconButton color="orange" className='px-10 w-full'>
            <MagnifyingGlassIcon className="h-5 w-5" onClick={handleSearch} />
          </IconButton>
        </div>
      </div>

      {/* broker Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
        {brokers && brokers.length !== 0 ? (brokers.map((element) => {
          return (
            <div className="flex flex-col gap-1" key={element._id} onClick={() => navigate("/agent", { state: { uId: element._id } })}>
              <Avatar src={element.brokersDetails.photo.url} alt={element._id} variant='rounded' className='h-[20rem] w-[20rem]' />
              <h1 className="text-xl font-bold flex items-center justify-center">{element.name}
                
              </h1>
              <span className="text-base">{element.brokersDetails.experience} experience</span>
            </div>
          );
        })) : (<div className="flex w-[90vw] justify-center items-center">
          <img
            src="/gifs/notFoundAnimation.gif"
            alt="Oops, nothing there"
            className="w-48 h-auto"
          />
        </div>)}
      </div>

      {/* pagination */}
      <div className="flex items-center gap-2 lg:gap-4 justify-center my-10">
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
          disabled={!brokers || brokers.length === 0 || page === 25}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-primary" />
        </Button>
      </div>
    </div>
    </>
  );
};

export default Agents;
