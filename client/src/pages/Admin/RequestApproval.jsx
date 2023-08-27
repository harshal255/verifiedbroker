import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import { BsFillPersonCheckFill, BsFillPersonXFill } from 'react-icons/bs'
import { useEffect, useState } from "react";
import axios from "axios";

const REQUEST_APPROVAL_HEAD = ["Member", "Phone", "Email", "Date", "Approve or Reject"];

const RequestApprovalComponent = () => {

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchReq = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/admin/users?page=${page}&brokersDetails.isVerified=false&brokersDetails.paymentStatus=false`,
            };

            axios.request(config)
                .then((response) => {
                    setUsers(response.data.users);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchReq();

    }, [page]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const handleApproval = async (uId) => {

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/broker/approve/${uId}`,
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== uId));
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const handleRejection = async (uId) => {

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/broker/reject/${uId}`,
        };

        axios.request(config)
            .then((response) => {
                console.log(response);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== uId));
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
                            {REQUEST_APPROVAL_HEAD.map((head, index) => (
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
                                        {index !== REQUEST_APPROVAL_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length >= 1 ? (
                            users.map(({ _id, name, email, brokersDetails }, index) => {
                                const isLast = index === users.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                const { phone, createdAt, photo } = brokersDetails;
                                const img = photo.url;

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={img} alt={name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
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
                                            <div className="flex flex-col">
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
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formatDate(createdAt)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex gap-3 items-center justify-start">
                                                <IconButton variant="text" color="green">
                                                    <BsFillPersonCheckFill className="h-5 w-5" onClick={()=>handleApproval(_id)} />
                                                </IconButton>
                                                <IconButton variant="text" color="red">
                                                    <BsFillPersonXFill className="h-5 w-5" onClick={()=>handleRejection(_id)}/>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
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
                    <Button variant="outlined" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" onClick={() => setPage(page + 1)}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </>

    )
}

export default RequestApprovalComponent
