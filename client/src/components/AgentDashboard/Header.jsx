import React from "react";
import { useEffect, useState } from "react";
import {
    ListItem,
    Menu, MenuList, MenuHandler,
    Avatar,
    IconButton,
    MobileNav,
    Typography
} from "@material-tailwind/react";
import { Link} from 'react-router-dom'
import {
    ChevronDownIcon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";
import { FaEnvelope, FaBell } from 'react-icons/fa';


const DashbordHeader = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [openNav, setOpenNav] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const handleMenuToggle = () => {
        setIsMobileMenuOpen((current) => !current);
    };

    const propertySubMenu = [
        {
            title: 'Agents',
            items: [
                { label: 'Agent', link: '/' },
                { label: 'Agent Single', link: '/' },
                { label: 'Agency', link: '/' },
                { label: 'Agency Single', link: '/' },
            ],
        },
        {
            title: 'Dashboard',
            items: [
                { label: 'Dashboard', link: '/' },
                { label: 'Message', link: '/' },
                { label: 'New Property', link: '/' },
                { label: 'My Properties', link: '/' },
                { label: 'My Favorites', link: '/' },
                { label: 'Saved Search', link: '/' },
                { label: 'Reviews', link: '/' },
                { label: 'My Package', link: '/' },
                { label: 'My Profile', link: '/' },
            ],
        },
        {
            title: 'Map Style',
            items: [
                { label: 'Map Style', link: '/' },
                { label: 'Header Map Style', link: '/' },
                { label: 'Half Map Style v1', link: '/' },
                { label: 'Half Map Style v2', link: '/' },
                { label: 'Half Map Style v3', link: '/' },
                { label: 'Half Map Style v4', link: '/' },
            ],
        },
        {
            title: 'Single Style',
            items: [
                { label: 'Single V1', link: '/' },
                { label: 'Single V2', link: '/' },
                { label: 'Single V3', link: '/' },
                { label: 'Single V4', link: '/' },
                { label: 'Single V5', link: '/' },
                { label: 'Single V6', link: '/' },
                { label: 'Single V7', link: '/' },
                { label: 'Single V8', link: '/' },
                { label: 'Single V9', link: '/' },
                { label: 'Single V10', link: '/' },
            ],
        },
    ];

    const PropertySubMenu = ({ submenuItem }) => {
        const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

        return (
            <li
                className="menu-btn font-bold flex gap-3"
                onMouseOver={() => setIsSubMenuOpen(true)}
                onMouseOut={() => setIsSubMenuOpen(false)}
            >
                <span>{submenuItem.title}</span>
                <ChevronRightIcon
                    strokeWidth={2}
                    className={`h-4 w-4 ml-2 transform ${isSubMenuOpen ? "rotate-90" : ""}`}
                />
                <Menu
                    open={isSubMenuOpen}
                    handler={setIsSubMenuOpen}
                    offset={{ mainAxis: 10, crossAxis: 0 }}
                    placement="right-start"
                    allowHover={true}

                >
                    <MenuHandler>
                        <span></span>
                    </MenuHandler>
                    <MenuList className={`hidden ${isSubMenuOpen ? "lg:block menu-ex" : ""}`}>
                        <ul className="text-center flex-col items-center justify-center gap-3">
                            {submenuItem.items.map((item) => (
                                <li key={item.label} className="menu-btn text-gray-600">
                                    <Link href={item.link}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </MenuList>
                </Menu>
            </li>
        );
    };

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <div
                className="menu-item-wrapper"
                onMouseOver={() => setIsDropdownOpen(true)}
                onMouseOut={() => setIsDropdownOpen(false)}
            >
                <Menu
                    open={isDropdownOpen}
                    handler={setIsDropdownOpen}
                    offset={{ mainAxis: 20 }}
                    placement="bottom"
                    allowHover={true}
                >
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-normal">
                            <ListItem
                                className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={handleMenuToggle}
                            >
                                <div className='menu-btn'>
                                    Home
                                </div>
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`h-3 w-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </ListItem>
                        </Typography>

                    </MenuHandler>
                    <MenuList className="hidden lg:block menu-ex ">
                        <ul className="text-center flex flex-col gap-3">
                            <li className='menu-btn text-gray-600'><Link href="/">Home V1</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V2</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V3</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V4</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V5</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V6</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V7</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V8</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V9</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Home V10</Link></li>
                        </ul>
                    </MenuList>
                </Menu>
            </div>
            <div
                className="menu-item-wrapper"
                onMouseOver={() => setIsDropdownOpen2(true)}
                onMouseOut={() => setIsDropdownOpen2(false)}
            >
                <Menu
                    open={isDropdownOpen2}
                    handler={setIsDropdownOpen2}
                    offset={{ mainAxis: 20 }}
                    placement="bottom"
                    allowHover={true}
                >
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-normal">
                            <ListItem
                                className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={handleMenuToggle}
                            >
                                <div className='menu-btn'>
                                    Listing
                                </div>
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`h-3 w-3 transition-transform ${isDropdownOpen2 ? "rotate-180" : ""
                                        }`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                    <MenuList className="hidden lg:block menu-ex">
                        <div className="grid grid-cols-3 gap-6">
                            {/* First Column */}
                            <div>
                                <ul className="text-center flex flex-col gap-3">
                                    <li className="menu-btn font-bold">
                                        <Link href="/">Grid View</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Default v1</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Default v2</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Full Width 3 Cols</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Full Width 4 Cols</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Full Width 2 Cols</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Full Width 1 Cols v1</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Grid Full Width 1 Cols v2</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Banner Search v1</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Banner Search v2</Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Second Column */}
                            <div>
                                <ul className="text-center flex flex-col gap-3">
                                    <li className="menu-btn font-bold">
                                        <Link href="/">Map Style</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Header Map Style</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Map V1</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Map V2</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Map V3</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">Map V4</Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Third Column */}
                            <div>
                                <ul className="text-center flex flex-col gap-3">
                                    <li className="menu-btn font-bold">
                                        <Link href="/">List View</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">List v1</Link>
                                    </li>
                                    <li className="menu-btn text-gray-600">
                                        <Link href="/">List All Style</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MenuList>
                </Menu>
            </div>
            <div
                className="menu-item-wrapper"
                onMouseOver={() => setIsDropdownOpen3(true)}
                onMouseOut={() => setIsDropdownOpen3(false)}
            >
                <Menu
                    open={isDropdownOpen3}
                    handler={setIsDropdownOpen3}
                    offset={{ mainAxis: 20, crossAxis: 0 }}
                    placement="bottom"
                    allowHover={true}
                >
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-normal">
                            <ListItem
                                className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={handleMenuToggle}
                            >
                                <div className="menu-btn">Property</div>
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`h-3 w-3 transition-transform ${isDropdownOpen3 ? "rotate-180" : ""}`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                    <MenuList className={`hidden ${isDropdownOpen3 ? "lg:block menu-ex" : ""}`}>
                        <ul className="text-center flex flex-col items-center justify-center gap-3">
                            {propertySubMenu.map((submenuItem) => (
                                <PropertySubMenu key={submenuItem.title} submenuItem={submenuItem} className="flex flex-col gap-3"
                                />
                            ))}
                        </ul>
                    </MenuList>
                </Menu>
            </div>
            <div
                className="menu-item-wrapper"
                onMouseOver={() => setIsDropdownOpen4(true)}
                onMouseOut={() => setIsDropdownOpen4(false)}
            >
                <Menu
                    open={isDropdownOpen4}
                    handler={setIsDropdownOpen4}
                    offset={{ mainAxis: 20 }}
                    placement="bottom"
                    allowHover={true}
                >
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-normal">
                            <ListItem
                                className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={handleMenuToggle}
                            >
                                <div className='menu-btn'>
                                    Blog
                                </div>
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`h-3 w-3 transition-transform ${isDropdownOpen4 ? "rotate-180" : ""
                                        }`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                    <MenuList className="hidden lg:block menu-ex ">
                        <ul className="text-center flex flex-col gap-3">
                            <li className='menu-btn text-gray-600'><Link href="/">List V1</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">List V2</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">List V3</Link></li>
                            <li className='menu-btn text-gray-600'><Link href="/">Single</Link></li>
                        </ul>
                    </MenuList>
                </Menu>
            </div>
            <div
                className="menu-item-wrapper"
                onMouseOver={() => setIsDropdownOpen5(true)}
                onMouseOut={() => setIsDropdownOpen5(false)}
            >
                <Menu
                    open={isDropdownOpen5}
                    handler={setIsDropdownOpen5}
                    offset={{ mainAxis: 20 }}
                    placement="bottom"
                    allowHover={true}
                >
                    <MenuHandler>
                        <Typography as="div" variant="small" className="font-normal">
                            <ListItem
                                className="flex items-center gap-2 py-2 pr-4 menu-btn"
                                selected={isMenuOpen || isMobileMenuOpen}
                                onClick={handleMenuToggle}
                            >
                                <div className='menu-btn'>
                                    Pages
                                </div>
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`h-3 w-3 transition-transform ${isDropdownOpen5 ? "rotate-180" : ""
                                        }`}
                                />
                            </ListItem>
                        </Typography>
                    </MenuHandler>
                    <MenuList className="hidden lg:block menu-ex">
                        <ul className="text-center flex flex-col gap-3">
                            <li className="menu-btn text-gray-600">
                                <Link href="/about">About</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/contact">Contact</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/compare">Compare</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/pricing">Pricing</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/faq">Faq</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/login">Login</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/register">Register</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/404">404</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/invoices">Invoices</Link>
                            </li>
                            <li className="menu-btn text-gray-600">
                                <Link href="/ui-elements">UI Elements</Link>
                            </li>
                        </ul>
                    </MenuList>
                </Menu>
            </div>
        </ul >
    );

    return (
        <div className="w-full fixed top-0 py-2 px-4 lg:px-8 lg:py-4 border-4 border-black mx-0 bg-white z-50">
            <nav className="my-0">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <div className="p-4 text-left flex flex-row-reverse xl:flex-row items-center justify-center gap-5">
                        <Typography variant="h4" color="blue-gray">
                            Logo
                        </Typography>
                    </div>
                    <div className="hidden lg:block">{navList}</div>
                    <div className="flex items-center justify-end space-x-2">
                        <IconButton variant="outlined" className="rounded-full" style={{ backgroundColor: 'transparent' }}>
                            <FaEnvelope color="black" />
                        </IconButton>
                        <IconButton variant="outlined" className="rounded-full" style={{ backgroundColor: 'transparent' }}>
                            <FaBell color="black" />
                        </IconButton>
                        <Avatar src="/images/avtar.jpg" alt="avatar" />
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
                            <Avatar src="/images/avtar.jpg" alt="avatar" />
                        </div>
                    </div>
                </MobileNav>
            </nav>

        </div>
    )
}

export default DashbordHeader