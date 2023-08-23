import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
    Avatar
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import AuthContext from "./AuthContext";

const Brokersignup = () => {

    const [brokerDetails, setBrokerDetails] = useState({
        photo:"",
        phone: '',
        address: '',
        experience: '',
        about: '',
        reference: '',
        a: null,
        b: null,
        c: null,
        d: null,
        e: null,
        f: null,
    });

    console.log(brokerDetails);

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setBrokerDetails((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:3000/api/broker/${localStorage.getItem("uId")}`,
                brokerDetails,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );


            if (response.status === 200) {
                toast.success("Registration Done");

                setTimeout(() => {
                    navigate("/becomeagent"); // Make sure navigate is imported and available
                }, 1000);

                setUser(response.data.data);

            } else {
                toast.error(response.statusText);
            }
        } catch (error) {
            toast.error(error.response.data)
        }
    };



    return (
        <div>
            <Toaster position="top-center"></Toaster>
            <Card color="transparent" className="flex justify-center items-center py-10" shadow={false}>
                <img src="/images/Login/login.png" alt="bg" className="absolute h-full w-full -z-10 opacity-60" />
                <div className="bg-white p-10 rounded-xl w-full md:3/4 xl:w-1/2 ">
                    <Typography variant="h4" color="orange" className="px-4 text-center  my-2">
                        SignUp
                    </Typography>
                    <form className=" mb-4 flex flex-col gap-6 items-center justify-center">
                        <label htmlFor="photo-upload" className="profile-photo">
                            <Avatar src={brokerDetails.photo ? URL.createObjectURL(brokerDetails.photo) : "https://res.cloudinary.com/dijdjkiqv/image/upload/v1692686408/Avatar/pyvclwz03vy0ty88cunf.jpg"} style={{"width":"140px","height":"140px"}}></Avatar>
                        </label>
                        <input
                            type="file"
                            name="photo"
                            id="photo-upload"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />

                        <Input type="phone" size="lg" name="phone" value={brokerDetails.phone} onChange={handleChange}
                            color="orange" label={
                                <>
                                    Phone No: <span className="text-red-500">*</span>
                                </>
                            } />

                        <Textarea size="lg" name="address" value={brokerDetails.address} onChange={handleChange}
                            color="orange" label={
                                <>
                                    Address: <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input size="lg" type="text" name="experience" value={brokerDetails.experience} onChange={handleChange}
                            color="orange" label={
                                <>
                                    Experience: <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input type="text" name="about" value={brokerDetails.about} onChange={handleChange}
                            size="lg" color="orange" label={
                                <>
                                    About <span className="text-red-500">*</span>
                                </>
                            } />


                        <Input
                            size="lg"
                            name="reference"
                            value={brokerDetails.reference}
                            onChange={handleChange}
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
                            name="a"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    A : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleChange}
                        />
                        <Input
                            size="lg"
                            name="b"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    B : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleChange}
                        />
                        <Input
                            size="lg"
                            name="c"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    C : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleChange}
                        />
                        <Input
                            size="lg"
                            name="d"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    D : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleChange}
                        />
                        <Input
                            size="lg"
                            name="e"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    E : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleChange}
                        />
                        <Input
                            size="lg"
                            name="f"
                            type="file"
                            color="orange"
                            label={
                                <>
                                    F : <span className="text-red-500">*</span>
                                </>
                            }
                            onChange={handleChange}
                        />

                    </form>
                    <Button className="mt-6" color="orange" type="submit" onClick={handleSubmit} fullWidth>
                        Register
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Brokersignup