import { useState } from 'react';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import DashboardAnalitics from "./DashboardAnalitics";
import BarChartHours from './BarChartHours';
import AreaChartWeekly from './AreaChartWeekly';
import PieChartMonthly from './PieChartMonthly';

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

function DashBoardBody() {
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
        <div className="body flex flex-col mt-4 overflow-y-auto flex-1 text-left">
            <h2 className="text-2xl font-bold">Howdy, Ali!</h2>
            <p className="text-gray-600 mt-2">We are glad to see you again!</p>
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
                <div className="mt-4">{renderChartComponent()}</div>
            </div>
            {/* <BarChartHours /> */}
            {/* <AreaChartWeekly /> */}
        </div>
    )
}

export default DashBoardBody