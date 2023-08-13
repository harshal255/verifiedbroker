import React, { useState } from 'react'
import DashbordHeader from '../../components/Dashboard/Header'
import Sidebar from '../../components/Dashboard/Sidebar'
import { PencilIcon } from "@heroicons/react/24/solid";
import { AiOutlineDelete } from 'react-icons/ai';
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import AdminProperties from '../../api/AdminProperty';
import { AdminPropertyHead } from '../../api/AdminProperty';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";




const Myproperty = () => {

  //for pagination
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "orange" : "orange-gray",
    onClick: () => setActive(index),
    className: "rounded-full text-white",
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(AdminProperties.length / itemsPerPage);
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const propertiesToShow = AdminProperties.slice(startIndex, endIndex);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };



  return (
    <>
      <DashbordHeader></DashbordHeader>
      <Sidebar></Sidebar>
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
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-2">
                  <span className="w-1/2">Sort by :</span>
                  <select label="All Cities" className='p-1 bg-white'>
                    <option>Material Tailwind HTML</option>
                    <option>Material Tailwind React</option>
                    <option>Material Tailwind Vue</option>
                    <option>Material Tailwind Angular</option>
                    <option>Material Tailwind Svelte</option>
                  </select>
                </div>
                <Link to="/agentdash/addnewproperty">
                  <Button className="flex items-center gap-3" size="sm" color='orange'>
                    Add New Property
                  </Button>
                </Link>
              </div>
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
                {propertiesToShow.map(
                  (
                    {
                      id,
                      img,
                      title,
                      address,
                      price,
                      date,
                      status,
                    },
                    index,
                  ) => {
                    const isLast = index === AdminProperties.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className='overflow-hidden rounded-lg'>
                              <img src={img} alt={title} className='hover:scale-105 duration-300 h-20 w-32 ' />
                            </div>
                            <div className="flex flex-col gap-2">
                              <span> {title}</span>
                              <span className="font-light text-start ml-2 text-sm text-gray-600">{address.city},{address.country},{address.state}</span>
                              <span className="font-bold text-start ml-2 text-sm">₹{price}/month</span>
                            </div>

                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
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
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>


                        <td className={classes}>
                          <Tooltip content="Edit Property">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Property">
                            <IconButton variant="text">
                              <AiOutlineDelete className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
          {/* pagination */}

          <CardFooter className="flex items-center gap-2 lg:gap-4 justify-center">
            <Button
              variant="text"
              color="orange"
              className="flex items-center gap-2 rounded-full"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-primary" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <IconButton
                  {...getItemProps(index + 1)}
                  className="hover:bg-orange-600 rounded-full text-black hover:text-white"
                  key={index}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              color="orange"
              className="flex items-center gap-2 rounded-full"
              onClick={next}
              disabled={active === totalPages}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-primary" />
            </Button>
          </CardFooter>


        </Card>
      </div>
    </>
  )
}

export default Myproperty
