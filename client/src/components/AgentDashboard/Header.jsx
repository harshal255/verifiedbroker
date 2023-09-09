import { useContext } from "react";
import { useEffect, useState } from "react";
import {
    Avatar,
    IconButton,
    MobileNav,
    Typography
} from "@material-tailwind/react";
import { FaEnvelope, FaBell } from 'react-icons/fa';
import AuthContext from "../../pages/AuthContext";


const DashbordHeader = () => {
    const [openNav, setOpenNav] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const { user } = useContext(AuthContext);

    console.log(user);


    return (
        <div className="w-full fixed top-0 py-2 px-4 lg:px-8 lg:py-4 mx-0 bg-white z-50">
            <nav className="my-0">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <div className="p-4 text-left flex flex-row-reverse xl:flex-row items-center justify-center gap-5">
                        <Typography variant="h4" color="blue-gray">
                            Verified Broker
                        </Typography>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <IconButton variant="outlined" className="rounded-full" style={{ backgroundColor: 'transparent' }}>
                            <FaEnvelope color="black" />
                        </IconButton>
                        <IconButton variant="outlined" className="rounded-full" style={{ backgroundColor: 'transparent' }}>
                            <FaBell color="black" />
                        </IconButton>
                        {user && user.brokersDetails && <Avatar src={user.brokersDetails.photo.url} alt="avatar" />}
                    </div>
                </div>
                <MobileNav open={openNav}>
                    <div className="container mx-auto">
                        <div className="flex items-center justify-end">
                            <IconButton variant="outlined" className="rounded-full" style={{ backgroundColor: 'transparent' }}>
                                <FaEnvelope color="black" />
                            </IconButton>
                            <IconButton variant="outlined" className="rounded-full" style={{ backgroundColor: 'transparent' }}>
                                <FaBell color="black" />
                            </IconButton>
                            {user && user.brokersDetails && <Avatar src={user.brokersDetails.photo.url} alt="avatar" />}
                        </div>
                    </div>
                </MobileNav>
            </nav>

        </div>
    )
}

export default DashbordHeader