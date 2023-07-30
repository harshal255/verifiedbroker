import React, { useState } from 'react';
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import Brokers from '../api/Brokers'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Agents = () => {

  //for pagination
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "orange" : "orange-gray",
    onClick: () => setActive(index),
    className: "rounded-full text-white",
  });

  const itemsPerPage = 25;
  const totalPages = Math.ceil(Brokers.length / itemsPerPage);
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const brokersToShow = Brokers.slice(startIndex, endIndex);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <div className="pt-0 mt-20">
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
          <Input label="Enter broker name" />
          <Select label="All Categories">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
          <Select label="Newest">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="w-1/2">Sort by</span>
          <Select label="All Cities">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
      </div>

      {/* broker Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
        {brokersToShow.map((element) => {
          return (
            <Link to="/agent" className="flex flex-col gap-1" key={element.id}>
              <img src={element.img} alt={element.id} />
              <h1 className="text-xl font-bold">{element.Name}</h1>
              <span className="text-base">{element.category}</span>
            </Link>
          );
        })}
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
  );
};

export default Agents;
