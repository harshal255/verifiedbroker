import { TbSmartHome } from 'react-icons/tb';
import { LiaSearchSolid } from 'react-icons/lia';
import { TbMessageCheck } from 'react-icons/tb';
import { FaRegHeart } from 'react-icons/fa';

const DataAnalitics = [
    {
        id: 1,
        icon: TbSmartHome,
        title: "All Properties",
        value: 583
    },
    {
        id: 2,
        icon: LiaSearchSolid,
        title: "Total Views",
        value: 192
    },
    {
        id: 3,
        icon: TbMessageCheck,
        title: "Total Visitor Reviews",
        value: 438,
    },
    {
        id: 4,
        icon: FaRegHeart,
        title: "Total Visitor Reviews",
        value: 67,
    },
]

const DashboardAnalitics = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 mx-auto flex flex-col">

                <div className="flex flex-wrap -m-4 text-center">
                    {
                        DataAnalitics.map((element) => {
                            let Icon = element.icon;
                            return (
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-full" key={element.id}>
                                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row-reverse items-center justify-center">
                                        <div className="bg-gray-100 rounded-full p-3">
                                            <Icon className="text-indigo-500 w-6 h-6" />
                                        </div>
                                        <div className="mr-4">
                                            <p className="font-thin">{element.title}</p>
                                            <h2 className="title-font font-medium text-3xl text-gray-900">{element.value}</h2>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    )
}

export default DashboardAnalitics;