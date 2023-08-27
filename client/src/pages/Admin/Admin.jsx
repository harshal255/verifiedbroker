import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import AllBrokerComponent from './AllBrokers';
import AllUsersComponent from './AllUsers';
import RequestApprovalComponent from './RequestApproval';
import { useState } from "react";



const TABS = [
    {
        label: "All Users",
        value: "all_users",

    },
    {
        label: "All Brokers",
        value: "all_brokers",

    },
    {
        label: "Request",
        value: "request_approval",

    },
];



const Admin = () => {

    const [activeTab, setActiveTab] = useState('all_users');

    const renderChartComponent = () => {
        // console.log(activeTab);
        switch (activeTab) {
            case 'all_users':
                return <AllUsersComponent />;
            case 'all_brokers':
                return <AllBrokerComponent />;
            case 'request_approval':
                return <RequestApprovalComponent />;
            default:
                return <AllUsersComponent />;
        }
    };


    return (
        <Card className="h-full w-full py-20">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Members list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all members
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value={activeTab} className="w-full">
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                            indicatorProps={{
                                className: 'bg-transparent border-b-2 border-deep-orange-500 shadow-none rounded-none',
                            }}
                        >
                            {TABS.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    className={activeTab === value ? 'text-deep-orange-500' : ''}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </div>
            </CardHeader >
            {renderChartComponent()}
        </Card >

    )
}

export default Admin



