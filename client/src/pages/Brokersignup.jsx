import {
    Card,
    Input,
    Button,
    Typography,
    Textarea
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Brokersignup = () => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        // Handle the file upload logic here
    };
    return (
        <div>
            <Card color="transparent" className="flex justify-center items-center py-10" shadow={false}>
                <img src="/images/Login/login.png" alt="bg" className="absolute h-full w-full -z-10 opacity-60" />
                <div className="bg-white p-10 rounded-xl w-full md:3/4 xl:w-1/2 ">
                    <Typography variant="h4" color="orange" className="px-4 text-center  my-2">
                        SignUp
                    </Typography>
                    <form className=" mb-4 flex flex-col gap-6 items-center justify-center">
                        <Input type="phone" size="lg"
                            color="orange" label={
                                <>
                                    Phone No: <span className="text-red-500">*</span>
                                </>
                            } />

                        <Textarea size="lg"
                            color="orange" label={
                                <>
                                    Address: <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input size="lg" type="text"
                            color="orange" label={
                                <>
                                    Experience: <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input type="text"
                            size="lg" color="orange" label={
                                <>
                                    About <span className="text-red-500">*</span>
                                </>
                            } />


                        <Input
                            size="lg"
                            type="text"
                            color="orange"
                            label={
                                <>
                                    Reference : <span className="text-red-500">*</span>
                                </>
                            }
                        />
                        <Input
                            size="lg"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    A : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleFileChange}
                        />
                        <Input
                            size="lg"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    B : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleFileChange}
                        />
                        <Input
                            size="lg"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    C : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleFileChange}
                        />
                        <Input
                            size="lg"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    D : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleFileChange}
                        />
                        <Input
                            size="lg"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    E : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleFileChange}
                        />
                        <Input
                            size="lg"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    F : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleFileChange}
                        />

                    </form>
                    <Button className="mt-6" color="orange" type="submit" fullWidth>
                        Register
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Brokersignup