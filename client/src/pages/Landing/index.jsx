import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  List,
  Card,
  Drawer,
  Input,
  ListItem,
} from "@material-tailwind/react";
import { AiOutlineClose } from 'react-icons/ai';
import { FaItunesNote } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import axios from "axios";
import countryStateData from '../../api/countryStateData.json';
import { toast, Toaster } from "react-hot-toast";


const NavbarDefault = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [advanceDrawer, setAdvancedDrawer] = useState(false)



  const handleClose = () => {
    setDrawerOpen(false)
  }

  const handleAdvancedDrawerClose = () => {
    setAdvancedDrawer(false)
  }

  const handleAdvancedDrawerOpen = () => {
    setAdvancedDrawer(true)
  }

  const [filters, setFilters] = useState({
    keyword: '',
    status: '',
    country: '',
    propertyType: '',
    price: '',
  });

  const navigate = useNavigate();

  const handleFilters = async () => {
    const queryParams = Object.keys(filters)
      .map((key) => {
        if (filters[key] !== '') {
          if (key === 'price') {
            return `${encodeURIComponent(key)}[lte]=${encodeURIComponent(filters[key])}`;
          } else {
            return `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`;
          }
        }
        return '';
      })
      .filter((param) => param !== '')
      .join('&');

    const filterUrl = `https://v-bbackend.vercel.app/api/property?${queryParams}`;
    console.log(filterUrl);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: filterUrl,
    }

    await axios.request(config)
      .then((res) => {
        if (res.data.property.length > 0) {
          toast.success("Property Found");
          return navigate('/property', { state: { properties: res.data.property } });
        }
        else {
          toast.error("No result found ");
        }
      })
      .catch((err) => {
        toast.error(err.response.statusText);
        console.error("failed to fetch property", err);
      });
  }
  return (
    <>
      <Toaster position="top-center"></Toaster>
      <div className="">

        <div className="h-20"></div>
        <Drawer className="bg-opacity-0 transition-all duration-75 ease-in-out" open={drawerOpen} placement="right" onClose={handleClose}>
          <Card>
            <List className="text-2xl">
              <ListItem><Link to="/">Find Properties</Link></ListItem>
              <ListItem><Link to="/">Find Agent</Link></ListItem>
              <ListItem><Link to="/">Become Agent</Link></ListItem>
              <ListItem><Link to="/">Signin</Link></ListItem>
              <ListItem><Link to="/">Login</Link></ListItem>
              <AiOutlineClose className="absolute top-6 right-1" onClick={handleClose} />
            </List>
          </Card>
        </Drawer>
        <Drawer open={advanceDrawer} className="bg-opacity-0 transition-all duration-1000 ease-in-out" placement="top" size={600}>
          <Card className="h-full rounded-none flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 mt-16 w-[90%] text-center">
              <div>
                <Typography className="text-md mb-2">Search</Typography>
                <Input
                  className="placeholder:text-black"
                  placeholder="Enter Keywords"
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                />
              </div>
              <div>
                <Typography className="text-md mb-3">Looking for</Typography>
                <select
                  color="black"
                  label="Select Property"
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  className="w-full border border-gray-500 px-4 py-2 rounded-lg bg-transparent"
                >
                  <option>Houses</option>
                  <option>Apartments</option>
                  <option>Office</option>
                  <option>Villa</option>
                  <option>Townhome</option>
                  <option>Bungalow</option>
                  <option>Land</option>
                </select>
              </div>
              <div>
                <Typography className="text-md mb-3">Location</Typography>
                <select
                  size="lg"
                  label="Select Country"
                  onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                  className="w-full border border-gray-500 px-4 py-2 rounded-lg bg-transparent"
                >
                  <option value="select country">Select country</option>
                  {countryStateData.map((country) => (
                    <option key={country.country_id} value={country.country_name}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Typography className="text-md mb-3">Price</Typography>
                <Input
                  className="placeholder:text-black"
                  placeholder="Enter Price"
                  value={filters.price}
                  onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                />
              </div>
              <div className="bg-red-400 w-28 h-16 mx-auto flex flex-row items-center justify-center rounded-md" onClick={handleFilters}>
                <BsSearch />
                <Typography>Search</Typography>
              </div>
            </div>
            <AiOutlineClose className="absolute top-6 right-16 bg-gray-300 rounded-full" fontSize="large" onClick={handleAdvancedDrawerClose} />
          </Card>
        </Drawer>
        <div className="bg-[url('/images/broker-giving-keys.jpg')] bg-center bg-cover text-white flex flex-col justify-center items-center w-auto h-[80vh] lg:h-[90vh]">
          <Typography className="text-[3rem] lg:text-[4rem]">Is Your Broker Verified?</Typography>
          <Typography className="text-2xl lg:text-[1rem] mt-3">Find Your Dream Property With a Trusted</Typography>
          <Typography className="text-2xl lg:text-[1rem]">Real Estate Marketplace!</Typography>
        </div>
        <div className="selection absolute bottom-20 md:bottom-0 md:w-[50vh] bg-white shadow-2xl rounded-md lg:bottom-[-80px] lg:w-auto w-full min-w-fit border border-black xl:left-48 pr-5">
          <List className="flex flex-row w-fit items-center justify-center text-black border-solid border-black">
            <ListItem
              className={`w-fit hover:bg-transparent hover:text-red-600 transition-all duration-100 ease-in-out ${filters.status === 'Buy' ? 'bg-orange-500 text-white' : ''
                }`}
              onClick={() => setFilters({ ...filters, status: 'Buy' })}
            >
              Buy
            </ListItem>
            <ListItem
              className={`w-fit hover:bg-transparent hover:text-red-600 transition-all duration-100 ease-in-out ${filters.status === 'Rent' ? 'bg-orange-500 text-white' : ''
                }`}
              onClick={() => setFilters({ ...filters, status: 'Rent' })}
            >
              Rent
            </ListItem>
            <ListItem
              className={`w-fit hover:bg-transparent hover:text-red-600 transition-all duration-100 ease-in-out ${filters.status === 'Sell' ? 'bg-orange-500 text-white' : ''
                }`}
              onClick={() => setFilters({ ...filters, status: 'Sell' })}
            >
              Sell
            </ListItem>
          </List>
          <hr />
          <div className="flex flex-row items-center  justify-between h-[6rem] lg:h-[6rem] lg:gap-5 lg:ml-8 ">
            <div className="hidden lg:block">
              <Typography className="text-md mb-2">Search</Typography>
              <Input
                className="placeholder:text-black"
                placeholder="Enter Keywords"
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              />
            </div>
            <div className="hidden lg:block">
              <Typography className="text-md mb-3">Looking for</Typography>
              <select
                color="black"
                label="Select Property"
                value={filters.propertyType}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg bg-transparent"
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              >
                <option>Houses</option>
                <option>Apartments</option>
                <option>Office</option>
                <option>Villa</option>
                <option>Townhome</option>
                <option>Bungalow</option>
                <option>Land</option>
              </select>
            </div>
            <div>
              <Typography className="text-md mb-3">Location</Typography>
              <select
                size="lg"
                label="Select Country"
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg bg-transparent"
              >
                <option value="select country">Select country</option>
                {countryStateData.map((country) => (
                  <option key={country.country_id} value={country.country_name}>
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden lg:block">
              <Typography className="text-md mb-3">Price</Typography>
              <Input
                className="placeholder:text-black"
                placeholder="Enter Price"
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              />
            </div>
            <div className="flex justify-around">
              <div className="px-10 flex  justify-center items-center lg:hidden">
                <FaItunesNote onClick={handleAdvancedDrawerOpen} />
                <Typography className="text-md mt-2">Advanced</Typography>
              </div>

              <div className="w-full h-16 bg-red-400 px-5 flex items-center justify-center rounded-md" onClick={handleFilters}>
                <BsSearch />
                <Typography>Search</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarDefault;