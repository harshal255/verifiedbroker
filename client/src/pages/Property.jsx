import {
  Breadcrumbs, Option, Select, Input, Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Checkbox,
  ButtonGroup, Button,
  Drawer,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
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
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  //for range slider filter
  const [value, setValue] = useState(12000);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/property?page=${page}`,
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
  }, [page]);


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

              <div className="flex items-center justify-between gap-2 xl:w-96 m-5">
                <span className="w-1/3">View by</span>
                <Select label="All Cities">
                  <Option>Grid</Option>
                  <Option>List</Option>

                </Select>
              </div>
              <div className="flex m-5 gap-2 text-gray-600"> <BsFilterCircle className="text-2xl cursor-pointer" onClick={openDrawer} /><span>Filter</span> </div>
            </div>
            <Drawer open={open} onClose={closeDrawer} className=" overflow-scroll ">
              <div className="border border-black flex flex-col text-center p-5 gap-5 items-center">
                <div className="flex justify-between gap-5 items-center ">
                  <div>
                    <h1 className="font-semibold text-start">Find your home</h1>
                    <div className="my-2">
                      <Input label="Username" />
                    </div>
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
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Sold
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
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Apratments
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
                  <p className="text-center mt-2">Value: {value} $</p>
                </div>

                {/* Bedroom button */}
                <div>
                  <h1 className="font-semibold text-start ">Bedroom button</h1>
                  <div className="flex flex-col">
                    <ButtonGroup variant="outlined" color="orange">
                      <Button className="h-10 w-10 text-center p-0">Any</Button>
                      <Button className="h-10 w-10 text-center p-0">1+</Button>
                      <Button className="h-10 w-10 text-center p-0">2+</Button>
                      <Button className="h-10 w-10 text-center p-0">3+</Button>
                      <Button className="h-10 w-10 text-center p-0">4+</Button>
                      <Button className="h-10 w-10 text-center p-0">5+</Button>
                    </ButtonGroup>
                  </div>
                </div>

                {/* Bath room button */}
                <div>
                  <h1 className="font-semibold text-start ">Bathroom button</h1>
                  <div className="flex flex-col">
                    <ButtonGroup variant="outlined" color="orange">
                      <Button className="h-10 w-10 text-center p-0">Any</Button>
                      <Button className="h-10 w-10 text-center p-0">1+</Button>
                      <Button className="h-10 w-10 text-center p-0">2+</Button>
                      <Button className="h-10 w-10 text-center p-0">3+</Button>
                      <Button className="h-10 w-10 text-center p-0">4+</Button>
                      <Button className="h-10 w-10 text-center p-0">5+</Button>
                    </ButtonGroup>
                  </div>
                </div>


                {/* Location */}
                <div className="flex flex-col items-center justify-center gap-5">
                  <h1 className="font-semibold text-start">Location</h1>
                  <div className="flex items-center justify-between gap-2 m-5">
                    <Select label="All Cities">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>
                </div>

                {/* year */}
                <div>
                  <h1 className="font-semibold  text-start">Year Built</h1>
                  <div className="flex flex-col gap-5 justify-center items-center">
                    <Input label="starting year" />
                    <Input label="ending year" />
                  </div>

                </div>
                {/* Search */}
                <Button className="w-full" color="orange">Search</Button>
                <div className="flex gap-1">
                  <Button className="min-w-fit" color="orange" variant="outlined">Reset Search</Button>
                  <Button className="min-w-fit" color="orange" variant="outlined">Save Search</Button>
                </div>
              </div>
            </Drawer>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 m-5">
              {properties.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                  <img
                    src="/gifs/property.gif"
                    alt="Oops, nothing there"
                    className="w-96 h-auto"
                  />
                </div>
              ) : (
                properties.map((element) => (
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
              )}
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
                disabled={page === 5}
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Property