import { useContext, useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast'
import AuthContext from "./AuthContext";


export default function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {setUser} = useContext(AuthContext);
    
    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password,
            });
            
            // Set the refresh token in the cookie
            toast.success("Log In Successfull");
            
            localStorage.setItem("uId",response.data.user._id);
            localStorage.setItem("role",response.data.user.role);
            const Token = response.data.token;
            Cookies.set('tokenjwt',Token);
            
            setTimeout(() => {
                if (response.data.user.role === 'admin') {
                    navigate('/admin');
                    window.location.href = '/admin';
                } else {
                    navigate('/');
                }
            }, 2000)
            
            setUser(response.data.user);

        } catch (error) {
            toast.error(error.response.statusText);
            console.error('Login failed:', error);
        }
    };



    return (
        <>
            <Toaster position="top-center"></Toaster>
            <Card color="transparent" className="h-screen flex justify-center items-center" shadow={false}>
                <img src="/images/Login/login.png" alt="bg" className="absolute h-screen w-screen -z-10 opacity-60" />
                <div className="bg-gray-200 p-10 rounded-xl">
                    <Typography variant="h4" color="orange" className="px-4 text-center">
                        LOGIN
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                        <div className="mb-4 flex flex-col gap-6  items-center justify-center">
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
                        <Typography color="gray" className="mt-2 mx-auto font-normal">
                            <a href="http://localhost:3000/api/forgot-password" className=" underline font-medium transition-colors hover:text-orange-700">
                                Forgot your password?
                            </a>
                        </Typography>
                        <Button className="mt-6" color="orange" type="submit" onClick={handleLogin} fullWidth>
                            SIGN IN
                        </Button>
                    </form>
                </div>


                <Typography color="gray" className="mt-4 mx-auto font-normal">
                    <Link to="/signup" className=" underline font-medium transition-colors hover:text-orange-700">
                        New customer? Create your account
                    </Link>
                </Typography>

            </Card>
        </>
    );
}
