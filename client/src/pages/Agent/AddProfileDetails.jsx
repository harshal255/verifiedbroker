import React, { useState, useRef } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Input, Textarea, Select, Option, Checkbox, Button } from '@material-tailwind/react';
import DashbordHeader from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';
import { AiOutlineDelete } from 'react-icons/ai';

const AddBrokerDetails = () => {
    // State to keep track of active tab and form data
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        description: '',
        media: null,
        location: '',
        detail: '',
        amenities: [],
    });

    // Ref for file input
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Simulate a click on the hidden file input element
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected file:', file);
        // Handle the selected file here
    };

    // Define form steps
    const formSteps = [
        {
            label: 'Description',
            content:
                (
                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl font-bold">Property Description</h1>
                        <div className="w-full">
                            <Input label="Title" />
                        </div>
                        <div className="w-full">
                            <Textarea label="Description" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="w-full">
                                <Select label="Select Category">
                                    <Option>Apartments</Option>
                                    <Option>Bungalow</Option>
                                    <Option>Houses</Option>
                                    <Option>Loft</Option>
                                    <Option>Office</Option>
                                    <Option>Townhome</Option>
                                    <Option>Villa</Option>
                                </Select>
                            </div>
                            <div className="w-full">
                                <Select label="Listed in">
                                    <Option>All Listing</Option>
                                    <Option>Active</Option>
                                    <Option>Sell</Option>
                                    <Option>Processing</Option>
                                </Select>
                            </div>
                            <div className="w-full">
                                <Select label="Property Status">
                                    <Option>All Cities</Option>
                                    <Option>Pending</Option>
                                    <Option>Processing</Option>
                                    <Option>Published</Option>
                                </Select>
                            </div>
                            <div className="w-full">
                                <Input label="Price in $" />
                            </div>
                            <div className="w-full">
                                <Input label="Yearly Tax Rate" />
                            </div>
                            <div className="w-full">
                                <Input label="After Price Label" />
                            </div>

                        </div>

                    </div>
                ),
        },
        {
            label: 'Media',
            content:
                (
                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl font-bold">Upload photos of your property</h1>
                        <div className="w-full h-96 flex flex-col gap-3 items-center justify-center border-[3px] border-dotted border-gray-500 rounded-lg">
                            <h1 className="text-2xl font-bold">Upload photos of your property</h1>
                            <span className="text-gray-500">Photos must be JPEG or PNG format and least 2048x768</span>
                            <div>
                                <Button variant="gradient" color="orange" className="flex items-center gap-3" onClick={handleButtonClick}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                        />
                                    </svg>
                                    Upload Files
                                </Button>
                                <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="invisible" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2  sm:grid-cols-5 gap-5">
                            <div className="relative">
                                <img src="/images/Properties/1.jpg" alt="1" className="rounded-xl h-40 w-52" />
                                <span className="absolute top-5 left-5 p-3 bg-white rounded-md">
                                    <AiOutlineDelete className="text-xl" />
                                </span>
                            </div>
                            <div className="relative">
                                <img src="/images/Properties/1.jpg" alt="1" className="rounded-xl h-40 w-52" />
                                <span className="absolute top-5 left-5 p-3 bg-white rounded-md">
                                    <AiOutlineDelete className="text-xl" />
                                </span>
                            </div>
                            <div className="relative">
                                <img src="/images/Properties/1.jpg" alt="1" className="rounded-xl h-40 w-52" />
                                <span className="absolute top-5 left-5 p-3 bg-white rounded-md">
                                    <AiOutlineDelete className="text-xl" />
                                </span>
                            </div>
                            <div className="relative">
                                <img src="/images/Properties/1.jpg" alt="1" className="rounded-xl h-40 w-52" />
                                <span className="absolute top-5 left-5 p-3 bg-white rounded-md">
                                    <AiOutlineDelete className="text-xl" />
                                </span>
                            </div>

                        </div>

                    </div>
                ),
        },
        {
            label: 'Location',
            content: (
                <div className="flex flex-col gap-5 ">
                    <h1 className="text-2xl font-bold">Listing Location</h1>
                    <div className="w-full">
                        <Input label="Address" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <Select label="Country/State">
                                <Option>Belgiul</Option>
                                <Option>France</Option>
                                <Option>Kewait</Option>
                                <Option>Qatar</Option>
                                <Option>Netherland</Option>
                                <Option>Germany</Option>
                                <Option>Turkey</Option>
                                <Option>UK</Option>
                                <Option>USA</Option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select label="City">
                                <Option>California</Option>
                                <Option>Chicago</Option>
                                <Option>Los Angeles</Option>
                                <Option>Manhattan</Option>
                                <Option>New Jersey</Option>
                                <Option>New York</Option>
                                <Option>San Diego</Option>
                                <Option>San Francisco</Option>
                                <Option>Texas</Option>
                            </Select>
                        </div>

                        <div className="w-full">
                            <Input label="zip" />
                        </div>
                        <div className="w-full">
                            <Select label="Country" animate={{
                                mount: { y: 25 },
                                unmount: { y: 50 },
                            }}>
                                <Option>Belgiul</Option>
                                <Option>France</Option>
                                <Option>Kewait</Option>
                                <Option>Qatar</Option>
                                <Option>Netherland</Option>
                                <Option>Germany</Option>
                                <Option>Turkey</Option>
                                <Option>UK</Option>
                                <Option>USA</Option>
                            </Select>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Place the listing pin on the map</h1>
                    <div className='map relative inline-block'><iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2547158278226!2d73.91419611127971!3d18.562551782466336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1681696533582!5m2!1sen!2sin"
                        allowFullScreen="" height={450} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" className='w-full'></iframe></div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <Input label="Latitude" />
                        </div>
                        <div className="w-full">
                            <Input label="Longitude" />
                        </div>
                    </div>

                </div>
            ),
        },
        {
            label: 'Detail',
            content: (
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Listing Location</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <Input label="Size in ft (only numbers)" />
                        </div>
                        <div className="w-full">
                            <Input label="Lot size in ft (only numbers)" />
                        </div>
                        <div className="w-full">
                            <Input label="Rooms" />
                        </div>
                        <div className="w-full">
                            <Input label="Bedrooms" />
                        </div>
                        <div className="w-full">
                            <Input label="Bathrooms" />
                        </div>
                        <div className="w-full">
                            <Input label="Custom ID (text)" />
                        </div>
                        <div className="w-full">
                            <Input label="Garages" />
                        </div>
                        <div className="w-full">
                            <Input label="Garage size" />
                        </div>
                        <div className="w-full">
                            <Input label="Year built (numeric)" />
                        </div>
                        <div className="w-full">
                            <Input label="Available from (date)" />
                        </div>
                        <div className="w-full">
                            <Input label="Basement" />
                        </div>
                        <div className="w-full">
                            <Input label="Extra details" />
                        </div>
                        <div className="w-full">
                            <Input label="Roofing" />
                        </div>
                        <div className="w-full">
                            <Input label="Exterior Material" />
                        </div>
                        <div className="w-full">
                            <Select label="Structure type">
                                <Option>Apartments</Option>
                                <Option>Bungalow</Option>
                                <Option>Houses</Option>
                                <Option>Loft</Option>
                                <Option>Office</Option>
                                <Option>Townhome</Option>
                                <Option>Villa</Option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select label="Flours">
                                <Option>1st</Option>
                                <Option>2nd</Option>
                                <Option>3rd</Option>
                                <Option>4th</Option>
                                <Option>5th</Option>
                                <Option>6th</Option>
                                <Option>7th</Option>
                            </Select>
                        </div>

                    </div>
                    <div className="w-full">
                        <Textarea label="Owner/ Agent nots (not visible on front end)" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <Select label="Energy Class">
                                <Option>All Listing</Option>
                                <Option>Active</Option>
                                <Option>Sold</Option>
                                <Option>Processing</Option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select label="Energy index in kWh/m2a">
                                <Option>All Cities</Option>
                                <Option>Pending</Option>
                                <Option>Processing</Option>
                                <Option>Published</Option>
                            </Select>
                        </div>
                    </div>


                </div>
            ),
        },
        {
            label: 'Amenities',
            content: (
                <div>
                    <h1 className="text-2xl font-bold">Select Amenities</h1>
                    <div className="w-full sm:w-1/2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 my-5">
                            <Checkbox label="Attic" />
                            <Checkbox label="Basketball court" />
                            <Checkbox label="Air Conditioning" />
                            <Checkbox label="Lawn" />
                            <Checkbox label="Swimming Pool" />
                            <Checkbox label="Barbeque" />
                            <Checkbox label="Microwave" />
                            <Checkbox label="TV Cable" />
                            <Checkbox label="Dryer" />
                            <Checkbox label="Outdoor Shower" />
                            <Checkbox label="Washer" />
                            <Checkbox label="Gym" />
                            <Checkbox label="Ocean view" />
                            <Checkbox label="Private space" />
                            <Checkbox label="Lake view" />
                            <Checkbox label="Wine cellar" />
                            <Checkbox label="Front yard" />
                            <Checkbox label="Refrigerator" />
                            <Checkbox label="WiFi" />
                            <Checkbox label="Laundry" />
                            <Checkbox label="Sauna" />

                        </div>
                    </div>

                </div>
            ),
        },
    ];

    const handleNext = () => {
        setActiveTab((prevTab) => Math.min(prevTab + 1, formSteps.length - 1));
    };

    const handlePrev = () => {
        setActiveTab((prevTab) => Math.max(prevTab - 1, 0));
    };

    const handleSubmit = () => {
        // Handle form submission with formData here
        console.log('Form data:', formData);
    };

    return (
        <>
            <DashbordHeader></DashbordHeader>
            <Sidebar></Sidebar>
            <div className="w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 overflow-scroll"
                        indicatorProps={{
                            className: 'bg-transparent border-b-2 border-blue-500 shadow-none rounded-none',
                        }}
                    >
                        {formSteps.map((step, index) => (
                            <Tab
                                key={step.label}
                                value={index}
                                onClick={() => setActiveTab(index)}
                                className={activeTab === index ? 'text-blue-500' : ''}
                            >
                                {step.label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {formSteps.map((step, index) => (
                            <TabPanel key={step.label} value={index}>
                                {activeTab === index && step.content}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
                <div className="flex flex-col sm:flex-row justify-around w-full gap-5">
                    {activeTab > 0 && <Button color="orange" onClick={handlePrev}>Prev</Button>}
                    {activeTab < formSteps.length - 1 ? (
                        <Button color="orange" onClick={handleNext}>Next</Button>
                    ) : (
                        <Button color="orange" onClick={handleSubmit}>Submit</Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddBrokerDetails;










