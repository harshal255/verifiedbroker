import React, { useState } from 'react'
import DashbordHeader from '../../components/AgentDashboard/Header'
import Sidebar from '../../components/AgentDashboard/Sidebar'
import Properties from '../../api/Property';
import {
    Button,
    IconButton
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { BiBed, BiBath } from 'react-icons/bi';
import { TbRulerMeasure } from 'react-icons/tb';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AiOutlineDelete } from 'react-icons/ai';


const MyFavourite = () => {

    const [active, setActive] = useState(1);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "orange" : "orange-gray",
        onClick: () => setActive(index),
        className: "rounded-full text-white",
    });

    const itemsPerPage = 8;
    const totalPages = Math.ceil(Properties.length / itemsPerPage);
    const startIndex = (active - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const propertiesToShow = Properties.slice(startIndex, endIndex);

    const next = () => {
        if (active === totalPages) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };


    console.log("I Think this is it");
    return (
        <>
            <DashbordHeader></DashbordHeader>
            <Sidebar></Sidebar>
            <div className="w-full xl:w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className='text-3xl font-bold'>My Favorites</h1>
                    <span className='text-sm'>We are glad to see you again!</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 m-5">
                    {
                        propertiesToShow.map((element) => {
                            return (
                                <Link to="/singleproperty" className="flex flex-col" key={element.id}>
                                    <div className="relative w-fit h-fit overflow-hidden rounded-lg">
                                        <img src={element.img} alt={element.title} className="hover:scale-110 duration-300 transition-all transform hover:-rotate-1 rounded-xl" />
                                        <span className="absolute top-5 right-5 p-3 bg-white rounded-md">
                                            <AiOutlineDelete className="text-xl" />
                                        </span>
                                        <div className="absolute z-10 bottom-5 left-2 text-black bg-white p-2 rounded-lg font-semibold">{element.price} $/month</div>
                                    </div>
                                    <div className="my-2 flex flex-col gap-2">
                                        <span className="font-bold text-start ml-2">{element.title}</span>
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

                </div>
                {/* pagination */}
                <div className="flex items-center gap-2 lg:gap-4 justify-center my-10">
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
                </div>
            </div>
        </>
    )
}

export default MyFavourite