import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Avatar,
  MobileNav,
  Typography,
  Button,
  List,
  Card,
  IconButton,
  Drawer,
  Input,
  Select,
  Option,
  ListItem,
} from "@material-tailwind/react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from "@mui/material";
import { useCountries } from "use-react-countries";

const NavbarDefault = () => {

  const { countries } = useCountries();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [advanceDrawer, setAdvancedDrawer] = useState(false)



  const handleClose = () => {
    setDrawerOpen(false)
  }

  const handleOpen = () => {
    setDrawerOpen(true)
  }

  const handleAdvancedDrawerClose = () => {
    setAdvancedDrawer(false)
  }

  const handleAdvancedDrawerOpen = () => {
    setAdvancedDrawer(true)
  }

  return (
    <>
      <div className="">

        <div className="h-20"></div>
        <Drawer className="bg-opacity-0 transition-all duration-75 ease-in-out" open={drawerOpen} placement="right" onClose={handleClose}>
          <Card>
            <List className="text-2xl">
              <ListItem><Link to="/">Buy</Link></ListItem>
              <ListItem><Link to="/">Rent</Link></ListItem>
              <ListItem><Link to="/">Sell</Link></ListItem>
              <ListItem><Link to="/">Find Agent</Link></ListItem>
              <ListItem><Link to="/">Blogs</Link></ListItem>
              <ListItem><Link to="/">Become Agent</Link></ListItem>
              <ListItem><Link to="/">Signin</Link></ListItem>
              <CloseIcon className="absolute top-6 right-5" onClick={handleClose} />
            </List>
          </Card>
        </Drawer>
        <Drawer open={advanceDrawer} className="bg-opacity-0 transition-all duration-1000 ease-in-out" placement="top" size={600}>
          <Card className="h-full rounded-none">
            <div className="flex flex-col w-80 gap-6 mt-16 ml-8">
              <div>
                <Typography className="text-md mb-2">Search</Typography>
                <Input className=" placeholder:text-black" placeholder="Enter Keywords" />
              </div>
              <div>
                <Typography className="text-md mb-3">Looking for</Typography>
                <Select color="black" label="Select Property" >
                  <Option>Houses</Option>
                  <Option>Apartments</Option>
                  <Option>Office</Option>
                  <Option>Villa</Option>
                  <Option>Townhome</Option>
                  <Option>Bungalow</Option>
                </Select>
              </div>
              <div>
                <Typography className="text-md mb-3">Location</Typography>
                <Select
                  size="lg"
                  label="Select Country"
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      className: "flex items-center px-0 gap-2 pointer-events-none",
                    })
                  }
                >
                  {countries.map(({ name, flags }) => (
                    <Option key={name} value={name} className="flex items-center gap-2">
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      {name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <Typography className="text-md mb-3">Price</Typography>
                <Select color="black" label="Select Price">
                  <Option>10000$</Option>
                  <Option>20000$</Option>
                  <Option>30000$</Option>
                  <Option>40000$</Option>
                  <Option>50000$</Option>
                </Select>
              </div>
              <div className="bg-red-400 w-28 h-16 mx-auto flex flex-row items-center justify-center rounded-md">
                <SearchIcon />
                <Typography>Search</Typography>
              </div>
            </div>
            <CloseIcon className="absolute top-6 right-16 bg-gray-300 rounded-full" fontSize="large" onClick={handleAdvancedDrawerClose} />
          </Card>
        </Drawer>
        <div className="bg-[url('/images/broker-giving-keys.jpg')] bg-center bg-cover pl-2 text-white flex flex-col justify-center items-center w-auto h-[80vh] lg:h-[90vh]">
          <Typography className="text-[3rem] lg:text-[4rem]">Is Your Broker Verified?</Typography>
          <Typography className="text-2xl lg:text-[1rem] mt-3">Find Your Dream Property With a Trusted</Typography>
          <Typography className="text-2xl lg:text-[1rem]">Real Estate Marketplace!</Typography>
        </div>
        <div className="selection absolute bottom-20 md:bottom-0 md:w-[50vh] mx-10 w-[27vh] bg-white shadow-2xl rounded-md lg:bottom-[-80px] lg:w-auto ml-[12.5%]">
          <List className="flex flex-row w-fit items-center justify-center text-black border-solid border-black">
            <ListItem className="w-fit hover:bg-transparent hover:text-red-600 transition-all duration-100 ease-in-out"><Link to="/">Buy</Link></ListItem>
            <ListItem className="w-fit hover:bg-transparent hover:text-red-600 transition-all duration-100 ease-in-out"><Link to="/">Rent</Link></ListItem>
            <ListItem className="w-fit hover:bg-transparent hover:text-red-600 transition-all duration-100 ease-in-out"><Link to="/">Sold</Link></ListItem>
          </List>
          <Divider />
          <div className="flex flex-row items-center w-auto justify-between h-[6rem] lg:h-[6rem] lg:gap-5 lg:ml-8">
            <div className="hidden lg:block">
              <Typography className="text-md mb-2">Search</Typography>
              <Input className=" placeholder:text-black" placeholder="Enter Keywords" />
            </div>
            <div className="hidden lg:block">
              <Typography className="text-md mb-3">Looking for</Typography>
              <Select color="black" label="Select Property" >
                <Option>Houses</Option>
                <Option>Apartments</Option>
                <Option>Office</Option>
                <Option>Villa</Option>
                <Option>Townhome</Option>
                <Option>Bungalow</Option>
              </Select>
            </div>
            <div className="hidden lg:block">
              <Typography className="text-md mb-3">Location</Typography>
              <Select
                size="lg"
                label="Select Country"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    className: "flex items-center px-0 gap-2 pointer-events-none",
                  })
                }
              >
                {countries.map(({ name, flags }) => (
                  <Option key={name} value={name} className="flex items-center gap-2">
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="hidden lg:block">
              <Typography className="text-md mb-3">Price</Typography>
              <Select color="black" label="Select Price">
                <Option>10000$</Option>
                <Option>20000$</Option>
                <Option>30000$</Option>
                <Option>40000$</Option>
                <Option>50000$</Option>
              </Select>
            </div>
            <div className="ml-10 flex flex-col justify-center items-center lg:hidden">
              <TuneIcon onClick={handleAdvancedDrawerOpen} />
              <Typography className="text-md mt-2">Advanced</Typography>
            </div>
            <div>
            </div>
            <div className="bg-red-400 w-20 h-16 ml-5 mr-12 flex flex-col items-center justify-center rounded-md">
              <SearchIcon />
              <Typography>Search</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarDefault;