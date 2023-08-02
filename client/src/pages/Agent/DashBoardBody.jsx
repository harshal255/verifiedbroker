import { useState } from 'react';
import { Tabs, TabsHeader, Tab, } from '@material-tailwind/react';
import DashboardAnalitics from "./DashboardAnalitics";
import PieChartMonthly from './PieChartMonthly';
import BarChartHours from './BarChartHours';
import AreaChartWeekly from './AreaChartWeekly';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { LuMessagesSquare, LuPackage2 } from 'react-icons/lu'
import { BsHouseAdd } from 'react-icons/bs'
import { BiHomeAlt2, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { CgProfile } from 'react-icons/cg'
import {
    PresentationChartBarIcon,
    PowerIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";


const data = [
    {
        label: 'Hours',
        value: 'hours',
    },
    {
        label: 'Weekly',
        value: 'weekly',
    },
    {
        label: 'Monthly',
        value: 'monthly',
    },
];



const DashBoardBody = () => {
    const [activeTab, setActiveTab] = useState('hours');

    const renderChartComponent = () => {
        console.log(activeTab);
        switch (activeTab) {
            case 'hours':
                return <BarChartHours />;
            case 'weekly':
                return <AreaChartWeekly />;
            case 'monthly':
                return <PieChartMonthly />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full xl:w-4/5 h-full xl:ml-[17.5rem] border border-black p-5 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Howdy, Ali!</h2>
            <p className="text-gray-600">We are glad to see you again!</p>
            <DashboardAnalitics />
            <div>
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className: 'bg-transparent border-b-2 border-blue-500 shadow-none rounded-none',
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={activeTab === value ? 'text-blue-500' : ''}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
                <div className="my-10 flex items-center justify-center flex-col gap-5">
                    {
                        renderChartComponent()
                    }
                </div>
            </div>

        </div>
    )
}

export default DashBoardBody