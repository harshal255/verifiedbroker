import React, { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";


const Brokerlogin = () => {
    return (
        <div>
           
           
                <Card color="transparent" className="h-screen flex justify-center items-center" shadow={false}>
                    <img src="/images/Login/login.png" alt="bg" className="absolute h-screen w-screen -z-10 opacity-60" />

                    <div className="bg-white p-10 rounded-xl">
                        <div className="py-4">
                            <Typography variant="h4" color="orange" className="px-4 text-center">
                                LOGIN
                            </Typography>
                        </div>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                            <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                                <Input type="email"
                                    size="lg" color="orange" label={
                                        <>
                                            Email <span className="text-red-500">*</span>
                                        </>
                                    } />
                                <Input
                                    size="lg"
                                    type="password"
                                    color="orange"
                                    label={
                                        <>
                                            Password <span className="text-red-500">*</span>
                                        </>
                                    }
                                />
                            </div>
                            <Typography color="gray" className="mt-2 mx-auto font-normal">
                                <Link to="" className=" underline font-medium transition-colors hover:text-orange-700">
                                    Forgot your password?
                                </Link>
                            </Typography>
                            <Button className="mt-6" color="orange" type="submit" fullWidth>
                                SIGN IN
                            </Button>
                        </form>
                        <Typography color="gray" className="mt-4 mx-auto font-normal">
                            <Link to="/brokersignup" className=" underline font-medium transition-colors hover:text-orange-700">
                                New customer? Create your account
                            </Link>
                        </Typography>
                    </div>
                </Card>
            </div>
      
    )
}

export default Brokerlogin