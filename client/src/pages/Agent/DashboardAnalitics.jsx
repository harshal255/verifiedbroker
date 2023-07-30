import { TbSmartHome } from 'react-icons/tb';
import { LiaSearchSolid } from 'react-icons/lia';
import { TbMessageCheck } from 'react-icons/tb';
import { FaRegHeart } from 'react-icons/fa';

const DashboardAnalitics = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-col">

                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <TbSmartHome className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">All Properties</p>
                                <h2 className="title-font font-medium text-3xl text-gray-900">583</h2>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <LiaSearchSolid className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">Total Views</p>
                                <h2 className="title-font font-medium text-3xl text-gray-900">192</h2>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <TbMessageCheck className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">Total Visitor Reviews</p>
                                <h2 className="title-font font-medium text-3xl text-gray-900">438</h2>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <FaRegHeart className="text-indigo-500 w-6 h-6" />
                            </div>
                            <div className="mr-4">
                                <p className="font-thin">Total Favorites</p>
                                <h2 className="title-font font-medium text-3xl text-gray-900">67</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardAnalitics;