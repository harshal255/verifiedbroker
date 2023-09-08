import { TbSmartHome } from 'react-icons/tb';
import { LiaSearchSolid } from 'react-icons/lia';
import { TbMessageCheck } from 'react-icons/tb';
import { FaRegHeart } from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai'
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../AuthContext';
import axios from 'axios';


const DashboardAnalitics = () => {

    const { user } = useContext(AuthContext);

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetchPropertiesData() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://v-bbackend.vercel.app/api/properties/${user._id}`,
                withCredentials: true,
            };

            axios.request(config)
                .then((response) => {
                    // console.log(response);
                    setProperties(response.data.property)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        fetchPropertiesData();
    }, [user])

    const getReviews = () => {
        const s = properties.reduce((sum, p) => sum + p.numOfReviews, 0);
        return s;
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto flex flex-col">

                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <TbSmartHome className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">All Properties</p>
                                {properties && <h2 className="title-font font-medium text-3xl text-gray-900">{properties.length}</h2>}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <TbMessageCheck className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">Reviews</p>
                                {user && user.brokersDetails && <h2 className="title-font font-medium text-3xl text-gray-900">{user.brokersDetails.numOfReviews}</h2>}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <TbMessageCheck className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">Property Reviews</p>
                                {properties && <h2 className="title-font font-medium text-3xl text-gray-900">{getReviews()}</h2>}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <AiOutlineStar className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">Ratings</p>
                                {user && user.brokersDetails && <h2 className="title-font font-medium text-3xl text-gray-900">{user.brokersDetails.ratings}</h2>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardAnalitics;