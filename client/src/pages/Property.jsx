import {
  Breadcrumbs, Input, Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Checkbox,
  ButtonGroup, Button,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import countryStateData from '../api/countryStateData.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BiBed, BiBath } from 'react-icons/bi';
import { TbRulerMeasure } from 'react-icons/tb';
import { useEffect, useState } from "react";
import { GrClose } from 'react-icons/gr'
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BsFilterCircle } from 'react-icons/bs'
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
const Property = () => {


  //for filter drawer
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  //for range slider filter
  const [value, setValue] = useState(12000);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue(e.target.value);
    setFilters({ ...filters, price: e.target.value });
  };

  const [page, setPage] = useState(1);
  const location = useLocation();
  const foudProperties = location.state ? location.state.properties : [];
  const [properties, setProperties] = useState(foudProperties);
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    if (properties.length === 0) {
      setComponentLoaded(true);
      const fetchProperty = async () => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://v-bbackend.vercel.app/api/property?page=${page}`,
          withCredentials: true,
        };

        await axios.request(config)
          .then((res) => {
            setProperties(res.data.property);
          })
          .catch((err) => {
            toast.error(err.response.statusText);
            console.error("failed to fetch property details", err);
          });
      }
      fetchProperty();
    }
  }, []);

  const fetchProperty = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://v-bbackend.vercel.app/api/property?page=${page}`,
      withCredentials: true,
    };

    await axios.request(config)
      .then((res) => {
        setProperties(res.data.property);
      })
      .catch((err) => {
        toast.error(err.response.statusText);
        console.error("failed to fetch property details", err);
      });
  }

  useEffect(() => {
    if (page !== 1 || componentLoaded) {
      fetchProperty();
    }
  }, [page]);

  const handleSearch = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://v-bbackend.vercel.app/api/property?keyword=${searchQuery}`,
      withCredentials: true,
    }

    await axios.request(config)
      .then((res) => {
        if (res.data.property.length > 0) {
          toast.success("Property Found");
          setProperties(res.data.property);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const [filters, setFilters] = useState({
    keyword: '',
    city: '',
    status: '',
    ratings: '',
    state: '',
    country: '',
    bath: '',
    bedroom: '',
    buildYear: '',
    propertyType: '',
    price: '',
  });
  const initialFilters = {
    keyword: '',
    city: '',
    status: '',
    ratings: '',
    state: '',
    country: '',
    bath: '',
    bedroom: '',
    buildYear: '',
    propertyType: '',
    price: '',
  };
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const handleFilters = async () => {
    const queryParams = Object.keys(filters)
      .map((key) => {
        if (filters[key] !== '') {
          if (key === 'bath' || key === 'bedroom' || key === 'ratings') {
            return `${encodeURIComponent(key)}[gte]=${encodeURIComponent(filters[key])}`;
          } else if (key === 'price') {
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
          setProperties(res.data.property);
        }
        else {
          toast.error("No result found ");
        }
      })
      .catch((err) => {
        toast.error(err.response.statusText);
        console.error("failed to fetch property", err);
      });
    closeDrawer();
  }

  return (
    <>
      <Toaster position="top-center"></Toaster>
      <div className="pt-0 mt-20 xl:mx-20">
        <h1 className="text-4xl text-start">Property</h1>
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
          <Link to="/property" className="opacity-60">
            <span>Property</span>
          </Link>
        </Breadcrumbs>

        <div className="flex">

          <div className="w-full">
            <div className="flex flex-col xl:flex-row justify-between items-center">

              <div className="flex flex-col xl:flex-row items-center justify-between w-full xl:m-5 gap-5">
                <span className="">Search by Property Name</span>
                <div className="flex xl:flex-row w-full shrink-0 gap-2 md:w-max">
                  <div className="w-full md:w-72 flex items-center justify-center gap-5">
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
              </div>
              <div className="flex m-5 gap-2 text-gray-600"> <BsFilterCircle className="text-2xl cursor-pointer" onClick={openDrawer} /><span>Filter</span> </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} className=" overflow-scroll ">
              <div className="border border-black flex flex-col text-center p-5 gap-5 items-center">
                <div className="flex justify-between gap-5 items-center ">
                  <div className="w-48 mt-5 flex items-center justify-center gap-5">
                    <Input
                      label="search"

                      value={filters.keyword}
                      onChange={(e) => { setFilters({ ...filters, keyword: e.target.value }) }}
                    />

                  </div>
                  {/* sidebar close icon */}
                  <div className="absolute right-5 top-5 cursor-pointer" onClick={closeDrawer}>
                    <GrClose />
                  </div>
                </div>

                {/* RadioButton Card */}
                <div>
                  <h1 className="font-semibold text-start">Listing Status</h1>
                  <Card>
                    <List>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              name="vertical-list"
                              id="vertical-list-react"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, status: 'Buy' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Buy
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-vue"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              name="vertical-list"
                              id="vertical-list-vue"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, status: 'Rent' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Rent
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              name="vertical-list"
                              id="vertical-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, status: 'Sell' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Sell
                          </Typography>
                        </label>
                      </ListItem>
                    </List>
                  </Card>
                </div>


                {/* CheckBox Card */}
                <div>
                  <h1 className="font-semibold text-start ">Property Type</h1>
                  <Card>
                    <List>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-react"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Houses' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Houses
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-vue"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-vue"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Apartment' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Apartments
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Office' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Office
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Villa' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Villa
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Townhome' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Townhome
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Land' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Land
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="vertical-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="vertical-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              onChange={() => { setFilters({ ...filters, propertyType: 'Bungalow' }) }}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Bungalow
                          </Typography>
                        </label>
                      </ListItem>
                    </List>
                  </Card>
                </div>



                {/* Range Slider with 1 handler */}
                <div className="w-60 sliderContainer bg-white rounded-10px shadow-sm flex flex-col text-center">
                  <input
                    type="range"
                    min={1000}
                    max={1200000}
                    value={value}
                    onChange={handleChange}
                    className="max-w-full h-1 bg-orange-500 appearance-none outline-none rounded-10px cursor-pointer thumb:bg-orange-500"
                  />
                  <p className="text-center mt-2">Price Under: {value} ₹</p>
                </div>

                {/* Bedroom button */}
                <div>
                  <h1 className="font-semibold text-start ">Bedroom</h1>
                  <div className="flex flex-col">
                    <ButtonGroup variant="outlined" color="orange">
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bedroom === 1 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bedroom: 1 }) }}>0+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bedroom === 2 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bedroom: 2 }) }}>1+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bedroom === 3 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bedroom: 3 }) }}>2+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bedroom === 4 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bedroom: 4 }) }}>3+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bedroom === 5 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bedroom: 5 }) }}>4+</Button>
                    </ButtonGroup>
                  </div>
                </div>

                {/* Bath room button */}
                <div>
                  <h1 className="font-semibold text-start ">Bathroom</h1>
                  <div className="flex flex-col">
                    <ButtonGroup variant="outlined" color="orange">
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bath === 1 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bath: 1 }) }}>0+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bath === 2 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bath: 2 }) }}>1+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bath === 3 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bath: 3 }) }}>2+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bath === 4 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bath: 4 }) }}>3+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.bath === 5 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, bath: 5 }) }}>4+</Button>
                    </ButtonGroup>
                  </div>
                </div>

                {/* ratings */}
                <div>
                  <h1 className="font-semibold text-start ">Ratings</h1>
                  <div className="flex flex-col">
                    <ButtonGroup variant="outlined" color="orange">
                      <Button className={`h-10 w-10 text-center p-0 ${filters.ratings === 1 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, ratings: 1 }) }}>0+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.ratings === 2 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, ratings: 2 }) }}>1+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.ratings === 3 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, ratings: 3 }) }}>2+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.ratings === 4 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, ratings: 4 }) }}>3+</Button>
                      <Button className={`h-10 w-10 text-center p-0 ${filters.ratings === 5 ? 'bg-orange-500 text-white' : ''}`} onClick={() => { setFilters({ ...filters, ratings: 5 }) }}>4+</Button>
                    </ButtonGroup>
                  </div>
                </div>


                {/* Location */}
                <div className="flex flex-col items-center justify-center gap-5">
                  <h1 className="font-semibold text-start">Location</h1>
                  <div className="flex flex-col gap-5 justify-center items-center">
                    <div id="coutnryState" className="mb-4 flex flex-col gap-3 justify-center items-center">
                      <select
                        value={filters.country}
                        onChange={(e) => { setFilters({ ...filters, country: e.target.value }) }}
                        className="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 w-48"
                      >
                        <option value="select country">Select country</option>
                        {countryStateData.map((country) => (
                          <option key={country.country_id} value={country.country_name}>
                            {country.country_name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={filters.state}
                        onChange={(e) => { setFilters({ ...filters, state: e.target.value }) }}
                        className="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 w-48"
                      >
                        <option value="select state">Select state</option>
                        {filters.country !== '' &&
                          countryStateData
                            .find((country) => country.country_name === filters.country)
                            ?.states.map((state) => (
                              <option key={state.state_id} value={state.state_name}>
                                {state.state_name}
                              </option>
                            ))}
                      </select>

                      <div className="w-48 flex items-center justify-center">
                        <Input
                          label="City"
                          className="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                          value={filters.city} // Control the input value with state
                          onChange={(e) => {
                            setFilters({ ...filters, city: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* year */}
                <div>
                  <h1 className="font-semibold  text-start">Year Built</h1>

                  <div className="flex flex-col gap-5 justify-center items-center">
                    <Input
                      label="Year Built"
                      value={filters.buildYear} // Control the input value with state
                      onChange={(e) => {
                        setFilters({ ...filters, buildYear: e.target.value });
                      }}
                    />
                  </div>

                </div>
                {/* Search */}
                <Button className="w-full" color="orange" onClick={handleFilters}>Search</Button>
                <div className="flex w-full gap-1">
                  <Button
                    className="w-full"
                    color="orange"
                    variant="outlined"
                    onClick={resetFilters}
                  >
                    Reset Search
                  </Button>
                </div>
              </div>
            </Drawer>

            {properties.length === 0 ? (
              <div className="flex justify-center items-center h-screen">
                <img
                  src="/gifs/property.gif"
                  alt="Oops, nothing there"
                  className="w-96 h-auto"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 m-5 place-items-center">
                {
                  properties.map((element) => (
                    <div key={element._id} onClick={() => navigate("/singleproperty", { state: { pId: element._id } })}>
                      <div className="relative w-fit h-fit overflow-hidden rounded-lg">
                        <img
                          src={element.p_Images[0].url}
                          alt={element.pName}
                          className="hover:scale-110 duration-300 transition-all transform hover:-rotate-1 rounded-xl w-[415px] h-[275px]"
                        />
                        <div className="absolute z-10 bottom-5 left-2 text-black bg-white p-2 rounded-lg font-semibold">
                          {element.price} ₹/month
                        </div>
                      </div>
                      <div className="my-2 flex flex-col gap-2">
                        <span className="font-bold text-start ml-2">{element.pName}</span>
                        <span className="font-light text-start ml-2 text-sm text-gray-600">
                          {element.city}, {element.country}, {element.state}
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
                          <span className="text-sm">{element.propertyType}</span>
                          <span className="text-sm">
                            {new Date().getFullYear() - element.buildYear} year ago
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

            )}

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
                disabled={properties.length === 0}
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default Property