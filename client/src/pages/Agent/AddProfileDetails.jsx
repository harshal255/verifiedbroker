import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsHeader, Tab, Input, Textarea, Checkbox, Button } from '@material-tailwind/react';
import DashbordHeader from '../../components/AgentDashboard/Header';
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

    // Initialize state for form fields and validation

    const [fieldValidations, setFieldValidations] = useState({
        title: false,
        description: false,
        category: false,
        propertyStatus: false,
        price: false,

    });

    const isTitleValid = propertyData.title !== '';
    const isDescriptionValid = propertyData.description !== '';
    const isCategoryValid = propertyData.category !== '';
    const isPropertyStatusValid = propertyData.propertyStatus !== '';
    const isPriceValid = propertyData.price !== '';

    const [mediaData, setMediaData] = useState({
        photofile: [],

    });

    const [mediaValidations, setMediaValidations] = useState({
        photofile: false,

    });

    const isPhotofileValid = mediaData.photofile.length > 0;


    const [locationData, setLocationData] = useState({
        address: '',
        city: '',
        zip: '',

    });
    console.log(locationData);

    const [locationValidations, setLocationValidations] = useState({
        address: false,
        city: false,
        zip: false,

    });

    const isCountryValid = selectedCountry !== '';
    const isStateValid = selectedState !== '';
    const isAddressValid = locationData.address !== '';
    const isCityValid = locationData.city !== '';
    const isZipValid = locationData.zip !== '';

    const [detailData, setDetailData] = useState({
        rooms: '',
        bedrooms: '',
        bathrooms: '',
        garages: '',
        yearBuilt: '',
        size: '',

    });

    const [detailValidations, setDetailValidations] = useState({
        rooms: false,
        bedrooms: false,
        bathrooms: false,
        garages: false,
        yearBuilt: false,

    });

    // Create validation functions for detail fields
    const isRoomsValid = detailData.rooms !== '';
    const isBedroomsValid = detailData.bedrooms !== '';
    const isBathroomsValid = detailData.bathrooms !== '';
    const isGaragesValid = detailData.garages !== '';
    const isYearBuiltValid = detailData.yearBuilt !== '';
    const isSizeValid = detailData.size !== '';


    const isNextButtonDisabled = () => {
        switch (activeTab) {
            case 0:
                return !(
                    isTitleValid &&
                    isDescriptionValid &&
                    isCategoryValid &&
                    isPropertyStatusValid &&
                    isPriceValid
                );
            case 1:
                return !isPhotofileValid;
            case 2:
                return !(
                    isStateValid &&
                    isCountryValid &&
                    isAddressValid &&
                    isCityValid &&
                    isZipValid
                );
            case 3:
                return !(
                    isRoomsValid &&
                    isBedroomsValid &&
                    isBathroomsValid &&
                    isGaragesValid &&
                    isYearBuiltValid &&
                    isSizeValid
                );
            // Add cases for other steps as needed
            default:
                return false;
        }
    };
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
        setMediaData((prevData) => ({
            ...prevData,
            photofile: [...prevData.photofile, ...filesArray],
        }));
    };

    const handleRemoveImage = (index) => {
        setPropertyData((prevData) => ({
            ...prevData,
            photofile: prevData.photofile.filter((_, i) => i !== index),
        }));
        setMediaData((prevData) => ({
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
                            required
                        />
                    </div>
                    <div className="w-full">
                        <Textarea
                            label="Description"
                            value={propertyData.description}
                            onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="w-full">
                            <select
                                value={propertyData.category}
                                onChange={(e) => setPropertyData({ ...propertyData, category: e.target.value })}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="Apartments">Select Category</option>
                                <option value="Apartments">Apartments</option>
                                <option value="Houses">Houses</option>
                                <option value="Office">Office</option>
                                <option value="Townhome">Townhome</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Villa">Villa</option>
                                <option value="Land">Land</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <select
                                value={propertyData.propertyStatus}
                                onChange={(e) => setPropertyData({ ...propertyData, propertyStatus: e.target.value })}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="All Cities">Property Status</option>
                                <option value="Pending">Buy</option>
                                <option value="Processing">Rent</option>
                                <option value="Published">Sell</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <Input
                                label="Price in ₹"
                                value={propertyData.price}
                                onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
                                required
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
                                        <AiOutlineDelete className="text-xl" onClick={() => handleRemoveImage(index)} />
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
                        <Input label="Address" value={locationData.address} onChange={(e) => setLocationData({ ...propertyData, address: e.target.value })} />
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
                            <Input label="City" value={locationData.city} onChange={(e) => setLocationData({ ...locationData, city: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="zip" value={locationData.zip} onChange={(e) => setLocationData({ ...locationData, zip: e.target.value })} />
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
                            <Input label="Rooms" value={detailData.rooms} onChange={(e) => setDetailData({ ...detailData, rooms: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Bedrooms" value={detailData.bedrooms} onChange={(e) => setDetailData({ ...detailData, bedrooms: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Bathrooms" value={detailData.bathrooms} onChange={(e) => setDetailData({ ...detailData, bathrooms: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Garages" value={detailData.garages} onChange={(e) => setDetailData({ ...detailData, garages: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label="Year built (numeric)" value={detailData.yearBuilt} onChange={(e) => setDetailData({ ...detailData, yearBuilt: e.target.value })} />
                        </div>
                        <div className="w-full">
                            <Input label='size' value={detailData.size} onChange={(e) => setDetailData({ ...detailData, size: e.target.value })} />
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

    // Update field validation state when fields change
    useEffect(() => {
        setFieldValidations({
            title: isTitleValid,
            description: isDescriptionValid,
            category: isCategoryValid,
            propertyStatus: isPropertyStatusValid,
            price: isPriceValid,
            // ...other fields
        });
    }, [propertyData]);
    useEffect(() => {
        // console.log(propertyData.photofile);
    }, [propertyData.photofile])

    useEffect(() => {
        setMediaValidations({
            photofile: isPhotofileValid,
            // ...other media fields
        });
    }, [mediaData]);

    useEffect(() => {
        setLocationValidations({
            address: isAddressValid,
            city: isCityValid,
            zip: isZipValid,
            // ...other location fields
        });
    }, [locationData]);

    useEffect(() => {
        setDetailValidations({
            rooms: isRoomsValid,
            bedrooms: isBedroomsValid,
            bathrooms: isBathroomsValid,
            garages: isGaragesValid,
            yearBuilt: isYearBuiltValid,
            // ...other detail fields
        });
    }, [detailData]);


    const handleAddProperty = async () => {

        const formData = new FormData();
        formData.append('pName', propertyData.title);
        formData.append('desc', propertyData.description);
        formData.append('bedroom', parseInt(detailData.bedrooms));
        formData.append('bath', parseInt(detailData.bathrooms));
        formData.append('buildYear', detailData.yearBuilt);
        formData.append('garage', parseInt(detailData.garages));
        formData.append('pSize', parseInt(detailData.size));
        formData.append('propertyType', propertyData.category);
        formData.append('status', propertyData.propertyStatus);
        formData.append('price', parseInt(propertyData.price));
        formData.append('Address', locationData.address);
        formData.append('ZipCode', locationData.zip);
        formData.append('city', locationData.city);
        formData.append('state', selectedState);
        formData.append('country', selectedCountry);
        formData.append('Rooms', detailData.rooms);

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
            <div className="w-4/5 h-full overflow-scroll xl:ml-[17.5rem] border border-black p-5  gap-5">
                <Tabs value={activeTab}>
                    {/* <TabsHeader
                        className="rounded-none bg-transparent p-0 overflow-scroll"
                        indicatorProps={{
                            className: 'bg-transparent shadow-none rounded-none',
                        }}
                    >
                        <Tab
                            key={formSteps[0].label}
                            value={0}
                            onClick={() => setActiveTab(0)}
                            className={activeTab === 0 ? 'text-deep-orange-500' : ''}
                        >
                            {formSteps[0].label}
                        </Tab>
                        <Tab
                            key={formSteps[1].label}
                            value={1}
                            onClick={() => setActiveTab(1)}
                            className={activeTab === 1 ? 'text-deep-orange-500' : ''}
                        >
                            {formSteps[1].label}
                        </Tab>
                        <Tab
                            key={formSteps[2].label}
                            value={2}
                            onClick={() => setActiveTab(2)}
                            className={activeTab === 2 ? 'text-deep-orange-500' : ''}
                        >
                            {formSteps[2].label}
                        </Tab>
                        <Tab
                            key={formSteps[3].label}
                            value={3}
                            onClick={() => setActiveTab(3)}
                            className={activeTab === 3 ? 'text-deep-orange-500' : ''}
                        >
                            {formSteps[3].label}
                        </Tab>
                        <Tab
                            key={formSteps[4].label}
                            value={4}
                            onClick={() => setActiveTab(4)}
                            className={activeTab === 4 ? 'text-deep-orange-500' : ''}
                        >
                            {formSteps[4].label}
                        </Tab>
                    </TabsHeader> */}
                    <TabsHeader className="rounded-none bg-transparent p-0 overflow-scroll">
                        {formSteps.map((step, index) => (
                            <Tab
                                key={step.label}
                                value={index}
                                onClick={() => {
                                    if (index < activeTab) {
                                        // Allow going back to previous steps
                                        setActiveTab(index);
                                    } else if (index === activeTab + 1 && !isNextButtonDisabled()) {
                                        // Allow moving to the next step if data is valid
                                        setActiveTab(index);
                                    }
                                    // You can add additional checks here for other scenarios
                                }}
                                className={activeTab === index ? 'text-deep-orange-500' : ''}
                            >
                                {step.label}
                            </Tab>
                        ))}
                    </TabsHeader>

                </Tabs>

                <div>
                    <div key={formSteps[activeTab].label} value={activeTab}>
                        {formSteps[activeTab].content}
                    </div>
                </div>

                {/* <div className="flex flex-col sm:flex-row justify-around w-full gap-5">
                    {activeTab > 0 && (
                        <Button color="orange" onClick={() => setActiveTab(activeTab - 1)}>
                            Prev
                        </Button>
                    )}

                    {activeTab < formSteps.length - 2 && (
                        <Button color="orange" onClick={() => setActiveTab(activeTab + 1)}
                            disabled={isNextButtonDisabled}
                        >
                            Next
                        </Button>
                    )}
                    <Button
                        color="orange"
                        onClick={() => setActiveTab(activeTab + 1)}
                        disabled={isMediaNextButtonDisabled}
                    >
                        Next
                    </Button>

                    <Button
                        color="orange"
                        onClick={() => setActiveTab(activeTab + 1)}
                        disabled={isLocationNextButtonDisabled}
                    >
                        Next
                    </Button>

                    {activeTab === formSteps.length - 2 && (
                        <Button color="orange" onClick={handleAddProperty}
                            disabled={isDetailNextButtonDisabled}>
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
                </div> */}
                <div className="flex flex-col sm:flex-row justify-around w-full gap-5">
                    {activeTab > 0 && (
                        <Button color="orange" onClick={() => setActiveTab(activeTab - 1)}>
                            Prev
                        </Button>
                    )}

                    <Button
                        color="orange"
                        onClick={() => {
                            if (activeTab === formSteps.length - 2) {
                                handleAddProperty();
                            } else if (activeTab === formSteps.length - 1) {
                                handleAddAminites();
                            } else {
                                setActiveTab(activeTab + 1);
                            }
                        }}
                        disabled={isNextButtonDisabled()}
                    >
                        {activeTab === formSteps.length - 2 ? 'Add Property' :
                            activeTab === formSteps.length - 1 ? 'Add Amenities' :
                                'Next'}

                    </Button>
                    {activeTab === formSteps.length - 1 && (


                        <Button color="orange" onClick={handleDeleteAminites}>
                            Delete Aminites
                        </Button>

                    )}
                </div>
            </div>
        </>
    );
};

export default AddBrokerDetails;