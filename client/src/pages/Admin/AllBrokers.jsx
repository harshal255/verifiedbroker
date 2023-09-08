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
import { MdVerified } from 'react-icons/md';
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from 'react-icons/fa'
import axios from "axios";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

const ALL_BROKERS_HEAD = ["Member", "Phone", "Email", "Payment Status", "Date", "View", "Delete"];

const AllBrokerComponent = () => {
    const [open, setOpen] = useState(false);
    const [broker, setBroker] = useState({});
    const [brokers, setBrokers] = useState(null);
    const [page, setPage] = useState(1);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const fetchBrokers = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://v-bbackend.vercel.app/api/brokers?page=${page}`,
            };

            axios.request(config)
                .then((response) => {
                    setBrokers(response.data.broker);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchBrokers();

    }, [page]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const handleUserDelete = async (userId) => {
        try {
            const response = await axios.delete(`https://v-bbackend.vercel.app/api/admin/user/${userId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            setBrokers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            alert('User deleted successfully!');
        } catch (error) {
            alert('Failed to delete user: ' + error.response.data.message);
            console.error('Failed to delete user:', error);
        }
    }

    const fetchUser = async (uId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://v-bbackend.vercel.app/api/admin/user/${uId}`,
            withCredentials: true
        };

        await axios.request(config)
            .then((response) => {
                setBroker(response.data.user)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    
    return (
        <>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {ALL_BROKERS_HEAD.map((head) => (
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
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {brokers && brokers.length >= 1 ? (
                            brokers.map(
                                ({ _id, name, email, brokersDetails }, index) => {
                                    const isLast = index === ALL_BROKERS_HEAD.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={_id}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={brokersDetails.photo.url} alt={name} size="sm" />
                                                    <div className="flex gap-3 items-center justify-center">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        {brokersDetails.isVerified ? <MdVerified className="text-deep-orange-500" /> : null}
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
                                                        {brokersDetails.phone}
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
                                                        value={brokersDetails.paymentStatus ? "Yes" : "No"}
                                                        color={brokersDetails.paymentStatus ? "green" : "blue-gray"}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {formatDate(brokersDetails.createdAt)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="View Details">
                                                    <IconButton variant="text">
                                                        <AiFillEye
                                                            className="h-4 w-4"
                                                            onClick={async () => {
                                                                await fetchUser(_id);
                                                                handleOpen();
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="View Details">
                                                    <IconButton variant="text" onClick={() => { handleUserDelete(_id) }} color="orange">
                                                        <AiFillDelete className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                }
                            )
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="/gifs/notFoundAnimation.gif"
                                            alt="Oops, nothing there"
                                            className="w-48 h-auto"
                                        />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {page}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" onClick={() => { setPage(page - 1) }} disabled={page === 1}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" onClick={() => { setPage(page + 1) }}>
                        Next
                    </Button>
                </div>
            </CardFooter>
            <Dialog open={open} handler={handleOpen} size={"xl"}>
                <DialogHeader>Broker Detils Details</DialogHeader>
                <DialogBody divider className="flex flex-col items-center justify-center gap-5">
                    <Avatar src={broker.brokersDetails?.photo.url} alt="avatar" size="xxl" className="text-center" />
                    <div className="grid grid-cols-3 gap-5 text-black">
                        <span className="flex gap-2 items-center">User Name :<span className="font-light">{broker.name}</span> <MdVerified className="text-deep-orange-500" /></span>
                        <span>Email id: <strong className="font-light">{broker.email}</strong> </span>
                        <span>Joining Date:<span className="font-light">{formatDate(broker.brokersDetails?.createdAt)}</span> </span>
                        <span>Phone :<span className="font-light">{broker.brokersDetails?.phone}</span> </span>
                        <span>Payment Status : <span className="text-green-600 font-light">{(broker.brokersDetails?.paymentStatus) ? "Yes" : "No"}</span> </span>
                        <span>Package:<span className="font-light">{broker.brokersDetails?.package}₹/month
                        </span></span>
                        <span>Address :<span className="font-light">{broker.brokersDetails?.address}</span> </span>
                        <span className="col-span-3">About :<span className="font-light">{broker.brokersDetails?.about} </span> </span>

                        <span className="col-span-3">Experience :<span className="font-light">{broker.brokersDetails?.experience} </span></span>
                        {broker.brokersDetails && (
                            <span className="flex gap-3 col-span-2">
                                References :
                                {Object.keys(broker.brokersDetails).map((key) => {
                                    if (key.match(/[a-f]/) && broker.brokersDetails[key]?.url) {
                                        return (
                                            <a key={key} href={broker.brokersDetails[key].url} target="_blank" rel="noopener noreferrer">
                                                <IconButton color="orange">
                                                    <FaExternalLinkAlt />
                                                </IconButton>
                                            </a>
                                        );
                                    }
                                    return null;
                                })}
                            </span>
                        )}
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

export default AllBrokerComponent;
