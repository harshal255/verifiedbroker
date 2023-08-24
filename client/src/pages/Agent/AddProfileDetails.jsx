import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsHeader, Tab, Input, Textarea, Checkbox, Button } from '@material-tailwind/react';
import DashbordHeader from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';
import { AiOutlineDelete } from 'react-icons/ai';
import countryStateData from '../../api/countryStateData.json';
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddBrokerDetails = () => {

    const location = useLocation();
    console.log(location.state?.pId);

    const [activeTab, setActiveTab] = useState(0);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const bId = localStorage.getItem('uId');
    const [pId, setPId] = useState(location.state?.pId || "");
    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        category: '',
        propertyStatus: '',
        price: '',
        photofile: [],
        size: '',
        address: '',
        city: '',
        zip: '',
        rooms: '',
        bedrooms: '',
        bathrooms: '',
        garages: '',
        yearBuilt: '',
    });
    const [selectedCountry, setSelectedCountry] = useState("select country");
    const [selectedState, setSelectedState] = useState("select state");

    // Ref for file input
    const fileInputRef = useRef(null);

    useEffect(() => {
        const pid = location.state?.pId;
        if (pid) setActiveTab(4);
    }, [location.state]);

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Simulate a click on the hidden file input element
    };

    const handleFileInputChange = (event) => {
        const filesArray = Array.from(event.target.files);
        setPropertyData((prevData) => ({
            ...prevData,
            photofile: [...prevData.photofile, ...filesArray],
        }));
    };

    const handleRemoveImage = (index) => {
        setPropertyData((prevData) => ({
            ...prevData,
            photofile: prevData.photofile.filter((_, i) => i !== index),
        }));
    };    

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState('');
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleAmenityChange = (amenity, event) => {
        const isChecked = event.target.checked;

        const updatedAmenities = isChecked
            ? [...selectedAmenities, amenity]
            : selectedAmenities.filter(a => a !== amenity);

        setSelectedAmenities(updatedAmenities);
    };

    useEffect(()=>{
      console.log(propertyData.photofile);
    },[propertyData.photofile])

    const formSteps = [
        {
            label: 'Description',
            content: (
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Property Description</h1>
                    <div className="w-full">
                        <Input
                            label="Title"
                            value={propertyData.title}
                            onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
                        />
                    </div>
                    <div className="w-full">
                        <Textarea
                            label="Description"
                            value={propertyData.description}
                            onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <select
                                value={propertyData.category}
                                onChange={(e) => setPropertyData({ ...propertyData, category: e.target.value })}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="Apartments">Select Category</option>
                                <option value="Apartments">Apartments</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Houses">Houses</option>
                                <option value="Loft">Loft</option>
                                <option value="Office">Office</option>
                                <option value="Townhome">Townhome</option>
                                <option value="Villa">Villa</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <select
                                value={propertyData.propertyStatus}
                                onChange={(e) => setPropertyData({ ...propertyData, propertyStatus: e.target.value })}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="All Cities">Property Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <Input
                                label="Price in ₹"
                                value={propertyData.price}
                                onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                            />
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
                                <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" multiple />
                            </div>
                        </div>

                        <div className="grid grid-cols-2  sm:grid-cols-5 gap-5 overflow-auto whitespace-nowrap">
                            {propertyData.photofile.map((file, index) => (
                                <div className="relative inline-block mr-4" key={index}>
                                    <img src={URL.createObjectURL(file)} alt={`Image ${index}`} className="rounded-xl h-40 w-52" />
                                    <span className="absolute top-5 left-5 p-3 bg-white rounded-md">
                                        <AiOutlineDelete className="text-xl" onClick={() => handleRemoveImage(index)}/>
                                    </span>
                                </div>
                            ))}
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
                        <Input label="Address" value={propertyData.address} onChange={(e) => setPropertyData({ ...propertyData, address: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div id="coutnryState" className="mb-4 flex flex-col gap-4">
                            <select
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            >
                                <option value="select country">Select country</option>
                                {countryStateData.map((country) => (
                                    <option key={country.country_id} value={country.country_name}>
                                        {country.country_name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedState}
                                onChange={handleStateChange}
                                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                            >
                                <option value="select state">Select state</option>
                                {selectedCountry !== "select country" &&
                                    countryStateData
                                        .find((country) => country.country_name === selectedCountry)
                                        ?.states.map((state) => (
                                            <option key={state.state_id} value={state.state_name}>
                                                {state.state_name}
                                            </option>
                                        ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <Input label="City" value={propertyData.city} onChange={(e) => setPropertyData({ ...propertyData, city: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="zip" value={propertyData.zip} onChange={(e) => setPropertyData({ ...propertyData, zip: e.target.value })} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Place the listing pin on the map</h1>
                    <div className='map relative inline-block'><iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2547158278226!2d73.91419611127971!3d18.562551782466336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1681696533582!5m2!1sen!2sin"
                        allowFullScreen="" height={450} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" className='w-full'></iframe></div>
                </div>
            ),
        },
        {
            label: 'Detail',
            content: (
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold">Add details</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <Input label="Rooms" value={propertyData.rooms} onChange={(e) => setPropertyData({ ...propertyData, rooms: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Bedrooms" value={propertyData.bedrooms} onChange={(e) => setPropertyData({ ...propertyData, bedrooms: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Bathrooms" value={propertyData.bathrooms} onChange={(e) => setPropertyData({ ...propertyData, bathrooms: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Garages" value={propertyData.garages} onChange={(e) => setPropertyData({ ...propertyData, garages: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Year built (numeric)" value={propertyData.yearBuilt} onChange={(e) => setPropertyData({ ...propertyData, yearBuilt: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label='size' value={propertyData.size} onChange={(e) => setPropertyData({ ...propertyData, size: e.target.value })} />
                        </div>
                    </div>
                    {/* <div className="w-full">
                        <Textarea label="Owner/ Agent nots (not visible on front end)" />
                    </div> */}
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
                            <Checkbox label="Attic" onChange={(event) => handleAmenityChange("Attic", event)} />
                            <Checkbox label="Basketball court" onChange={(event) => handleAmenityChange("Basketball court", event)} />
                            <Checkbox label="Air Conditioning" onChange={(event) => handleAmenityChange("Air Conditioning", event)} />
                            <Checkbox label="Lawn" onChange={(event) => handleAmenityChange("Lawn", event)} />
                            <Checkbox label="Swimming Pool" onChange={(event) => handleAmenityChange("Swimming Pool", event)} />
                            <Checkbox label="Barbeque" onChange={(event) => handleAmenityChange("Barbeque", event)} />
                            <Checkbox label="Microwave" onChange={(event) => handleAmenityChange("Microwave", event)} />
                            <Checkbox label="TV Cable" onChange={(event) => handleAmenityChange("TV Cable", event)} />
                            <Checkbox label="Dryer" onChange={(event) => handleAmenityChange("Dryer", event)} />
                            <Checkbox label="Outdoor Shower" onChange={(event) => handleAmenityChange("Outdoor Shower", event)} />
                            <Checkbox label="Washer" onChange={(event) => handleAmenityChange("Washer", event)} />
                            <Checkbox label="Gym" onChange={(event) => handleAmenityChange("Gym", event)} />
                            <Checkbox label="Ocean view" onChange={(event) => handleAmenityChange("Ocen view", event)} />
                            <Checkbox label="Private space" onChange={(event) => handleAmenityChange("Private space", event)} />
                            <Checkbox label="Lake view" onChange={(event) => handleAmenityChange("Lake view", event)} />
                            <Checkbox label="Wine cellar" onChange={(event) => handleAmenityChange("Wine celler", event)} />
                            <Checkbox label="Front yard" onChange={(event) => handleAmenityChange("Front yard", event)} />
                            <Checkbox label="Refrigerator" onChange={(event) => handleAmenityChange("Refrigerator", event)} />
                            <Checkbox label="WiFi" onChange={(event) => handleAmenityChange("WiFi", event)} />
                            <Checkbox label="Laundry" onChange={(event) => handleAmenityChange("Laundry", event)} />
                            <Checkbox label="Sauna" onChange={(event) => handleAmenityChange("Sauna", event)} />

                        </div>
                    </div>

                </div>
            ),
        },
    ];

    const handleAddProperty = async () => {

        const formData = new FormData();
        formData.append('pName', propertyData.title);
        formData.append('desc', propertyData.description);
        formData.append('bedroom', parseInt(propertyData.bedrooms));
        formData.append('bath', parseInt(propertyData.bathrooms));
        formData.append('buildYear', propertyData.yearBuilt);
        formData.append('garage', parseInt(propertyData.garages));
        formData.append('pSize', parseInt(propertyData.size));
        formData.append('propertyType', propertyData.category);
        formData.append('status', propertyData.propertyStatus);
        formData.append('price', parseInt(propertyData.price));
        formData.append('Address', propertyData.address);
        formData.append('ZipCode', propertyData.zip);
        formData.append('city', propertyData.city);
        formData.append('state', selectedState);
        formData.append('country', selectedCountry);
        formData.append('Rooms', propertyData.rooms);

        if (propertyData.photofile) {
            propertyData.photofile.forEach((file) => {
                formData.append(`propertyPhotos`, file);
            });
        }
        try {
            const res = await axios.post(
                `http://localhost:3000/api/add/property/${bId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log('Response from API:', res.data);
            setPId(res.data.property._id);
            toast.success("Property Data Added Successfully");
            setActiveTab(activeTab + 1);
        } catch (error) {
            console.error('Error:', error);

            if (error.response) {
                console.error('Response Status:', error.response.status);
                console.error('Response Data:', error.response.data);
                toast.error(error.response.statusText);
            } else {
                toast.error("An error occurred while communicating with the server.");
            }
        }
    }

    const handleAddAminites = () => {
        const data = JSON.stringify({
            amenities: selectedAmenities.join(', ') // Convert to comma-separated string
        });

        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/amenities/${pId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            data: data
        };

        axios.request(config)
            .then((response) => {
                toast.success("Amenities Data Added Successfully");
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
                // toast.error(error.response.data.message);
            });
    }

    const handleDeleteAminites = () => {
        // console.log(selectedAmenities);
        if (selectedAmenities.length == 0) {
            return toast.error("Please Select Something!");
        }
        let data = JSON.stringify({
            "amenities": selectedAmenities.join(', ')
        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/amenities/${pId}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                toast.success(selectedAmenities + " Deleted Successfully");
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.log(error);
            });
    }
    return (
        <>
            <Toaster position="top-center"></Toaster>
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
                        <Tab
                            key={formSteps[0].label}
                            value={0}
                            onClick={() => setActiveTab(0)}
                            className={activeTab === 0 ? 'text-blue-500' : ''}
                        >
                            {formSteps[0].label}
                        </Tab>
                        <Tab
                            key={formSteps[1].label}
                            value={1}
                            onClick={() => setActiveTab(1)}
                            className={activeTab === 1 ? 'text-blue-500' : ''}
                        >
                            {formSteps[1].label}
                        </Tab>
                        <Tab
                            key={formSteps[2].label}
                            value={2}
                            onClick={() => setActiveTab(2)}
                            className={activeTab === 2 ? 'text-blue-500' : ''}
                        >
                            {formSteps[2].label}
                        </Tab>
                        <Tab
                            key={formSteps[3].label}
                            value={3}
                            onClick={() => setActiveTab(3)}
                            className={activeTab === 3 ? 'text-blue-500' : ''}
                        >
                            {formSteps[3].label}
                        </Tab>
                        <Tab
                            key={formSteps[4].label}
                            value={4}
                            onClick={() => setActiveTab(4)}
                            className={activeTab === 4 ? 'text-blue-500' : ''}
                        >
                            {formSteps[4].label}
                        </Tab>
                    </TabsHeader>
                </Tabs>

                <div>
                    <div key={formSteps[activeTab].label} value={activeTab}>
                        {formSteps[activeTab].content}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-around w-full gap-5">
                    {activeTab > 0 && (
                        <Button color="orange" onClick={() => setActiveTab(activeTab - 1)}>
                            Prev
                        </Button>
                    )}

                    {activeTab < formSteps.length - 2 && (
                        <Button color="orange" onClick={() => setActiveTab(activeTab + 1)}>
                            Next
                        </Button>
                    )}

                    {activeTab === formSteps.length - 2 && (
                        <Button color="orange" onClick={handleAddProperty}>
                            Add Property
                        </Button>
                    )}

                    {activeTab === formSteps.length - 1 && (
                        <>
                            <Button color="orange" onClick={handleAddAminites}>
                                Add Aminites
                            </Button>

                            <Button color="orange" onClick={handleDeleteAminites}>
                                Delete Aminites
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddBrokerDetails;