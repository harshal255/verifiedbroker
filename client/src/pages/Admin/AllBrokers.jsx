import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Chip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import BROKERS_ROW, { ALL_BROKERS_HEAD } from '../../api/Admin/AllBrokers'
import { MdVerified } from 'react-icons/md';
import { useState } from "react";
import { FaExternalLinkAlt } from 'react-icons/fa'

const AllBrokerComponent = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {ALL_BROKERS_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== ALL_BROKERS_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {BROKERS_ROW.map(
                            ({ img, name, email, phone, verified, paymentstatus, date }, index) => {
                                const isLast = index === ALL_BROKERS_HEAD.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={img} alt={name} size="sm" />
                                                <div className="flex gap-3 items-center justify-center">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    {
                                                        verified ? <MdVerified className="text-deep-orange-500" /> : <span></span>
                                                    }


                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {phone}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">

                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {email}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">

                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={paymentstatus ? "Yes" : "No"}
                                                    color={paymentstatus ? "green" : "blue-gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="View Details">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" onClick={handleOpen} />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
            <Dialog open={open} handler={handleOpen} size={"xl"}>
                <DialogHeader>Broker Detils Details</DialogHeader>
                <DialogBody divider className="flex flex-col items-center justify-center gap-5">
                    <Avatar src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80" alt="avatar" size="xxl" className="text-center" />
                    <div className="grid grid-cols-3 gap-5 text-black">
                        <span className="flex gap-2 items-center">User Name :<span className="font-light">John Michael </span> <MdVerified className="text-deep-orange-500" /></span>
                        <span>Email id: <strong className="font-light">john@creative-tim.com</strong> </span>
                        <span>Date:<span className="font-light">21 Augest 2020</span> </span>
                        <span>Phone :<span className="font-light">9537407968</span> </span>
                        <span>Payment Status : <span className="text-green-600 font-light">Yes</span> </span>
                        <span>Package:<span className="font-light">$0/mo</span></span>
                        <span>Address :<span className="font-light">L.D. College of Engineering, Ahmedabad</span> </span>
                        <span className="col-span-3">About :<span className="font-light">To clear the input fields in a React component, you can use the ref attribute to create a reference to the input element, and then set its value to an empty string. You can do this in the onClick event handler of the button that triggers the form submission. Here an example:</span> </span>

                        <span className="col-span-3">Experience :<span className="font-light">To clear the input fields in a React component, you can use the ref attribute to create a reference to the input element. </span></span>
                        <span className="flex gap-3 col-span-2">References :
                            <IconButton color="orange">
                                <FaExternalLinkAlt />
                            </IconButton>
                            <IconButton color="orange">
                                <FaExternalLinkAlt />
                            </IconButton>
                            <IconButton color="orange">
                                <FaExternalLinkAlt />
                            </IconButton>
                            <IconButton color="orange">
                                <FaExternalLinkAlt />
                            </IconButton>
                            <IconButton color="orange">
                                <FaExternalLinkAlt />
                            </IconButton>
                            <IconButton color="orange">
                                <FaExternalLinkAlt />
                            </IconButton>
                        </span>

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="orange" onClick={handleOpen}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>

    )
}

export default AllBrokerComponent
