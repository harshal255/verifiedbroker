import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'


export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log(name, email, password);
            const response = await axios.post('http://localhost:3000/api/register', {
                name,
                email,
                password,
            });
            toast.success('Registration successful');
            console.log(response);

            setTimeout(() => {
                navigate('/login');
            }, 2000)


        } catch (error) {
            toast(error.response.statusText);
            console.error('Registration failed:', error);
        }
    };


    return (
        <>
            <Toaster position="top-center"></Toaster>
            <Card color="transparent" className="h-screen flex justify-center items-center" shadow={false}>
                <img src="/images/Login/login.png" alt="bg" className="absolute h-screen w-screen -z-10 opacity-60" />
                <div className="bg-gray-200 p-10 rounded-xl">
                    <Typography variant="h4" color="orange" className="px-4 text-center">
                        SignUp
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                        <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                            <Input type="text" size="lg" value={name}
                                onChange={(e) => setName(e.target.value)}
                                color="orange" label="Name" />
                            <Input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="lg" color="orange" label={
                                    <>
                                        Email <span className="text-red-500">*</span>
                                    </>
                                } />
                            <Input
                                size="lg"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                color="orange"
                                label={
                                    <>
                                        Password <span className="text-red-500">*</span>
                                    </>
                                }
                            />
                        </div>
                        <Button className="mt-6" color="orange" type="submit" onClick={handleRegister} fullWidth>
                            Register
                        </Button>
                    </form>
                </div>

                <Typography color="gray" className="mt-4 mx-auto font-normal">
                    <Link to="/login" className="underline font-medium text-black-500 transition-colors hover:text-orange-700">
                        Already have an account? Sign In
                    </Link>
                </Typography>
            </Card>
        </>
    );
}
