import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react"
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';



function CheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}


const priceCard = ({ plan, price, features }) => {

    const broker = {
        name: "Verified Broker",
        greet: "Glad to see you",
        price: price, 
    };

    const navigate = useNavigate();

    const {user,setUser} = useContext(AuthContext);

    const initPayments = async (data, user) => { 
        const options = {
            key: "rzp_test_6cA4Cj8nzFwqVO",
            amount: data.amount,
            currency: data.currency,
            name: broker.name,
            order_id: data.id,
            handler: async (res) => {
                try {
                    const response = await axios.post(`http://localhost:3000/api/verify/payment/${user._id}/${broker.price}`, res);
                    setTimeout(() => {
                        navigate("/agentdash");
                    }, 1000);
                    toast.success("Payment Done Successfully");
                    setUser(response.data.message);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/admin/user/${localStorage.getItem("userId")}`,
                withCredentials: true,
            };

            const response = await axios.request(config);
            const userData = response.data.user;

            if (!userData) {
                toast.error("Please log in");
            } else if (!userData.brokersDetails) {
                toast.error("Please register as a broker");
            } else if (!userData.brokersDetails.isVerified) {
                toast.error("Your request is under approval");
            } else if (!userData.brokersDetails.paymentStatus) {
                const subscribeResponse = await axios.post("http://localhost:3000/api/subscribe", {price:price }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                initPayments(subscribeResponse.data.order, userData); // Pass 'userData' to initPayments
            } else {
                toast.error("You already have a package");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    };




    return (
        <>
            <Toaster position='top-center'></Toaster>
            <Card variant="gradient" className="lg:w-[25rem] p-8 bg-white text-orange-600">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                >
                    <Typography
                        variant="small"
                        color="orange"
                        className="font-normal uppercase"
                    >
                        {plan}
                    </Typography>
                    <Typography
                        variant="h1"
                        color="orange"
                        className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                    >
                        <span className="mt-2 text-4xl">₹</span>{price}{" "}
                        <span className="self-end text-4xl">/mo</span>
                    </Typography>
                </CardHeader>
                <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                        {features.map((element) => (
                            <li className="flex items-center gap-4" key={element.id}>
                                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                                    <CheckIcon />
                                </span>
                                <Typography className="font-normal">{element.desc}</Typography>
                            </li>
                        ))}
                    </ul>
                </CardBody>
                <CardFooter className="mt-12 p-0">
                    <Button
                        size="lg"
                        color="orange"
                        className="text-white hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                        ripple={false}
                        fullWidth={true}
                        onClick={handleSubmit}
                    >
                        Buy Now
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default priceCard