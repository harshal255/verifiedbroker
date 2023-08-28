import {
    Card,
    Input,
    Button,
    Typography,
    Textarea
} from "@material-tailwind/react";
import ContactDetails from '../../api/Contact';
import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contact = () => {
    return (
        <div className='flex flex-col gap-10 items-center h-fit'>
            <h1 className='text-3xl'>Contact Us</h1>
            <span className='text-base'>Most calendars are designed for teams. Slate is designed for freelancers</span>
            <div className="flex flex-col xl:flex-row w-full h-full lg:h-[50rem] lg:max-h-fit gap-5 p-5">
                <div className='w-full xl:w-5/12 flex flex-col items-center justify-center h-[50rem] border border-black'>
                    <Card color="transparent" shadow={false}>
                        <Typography variant="h4" color="orange-gray">
                            Contact Us
                        </Typography>

                        <form className="mt-8 mb-2 max-w-screen-xl sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="xl" label="Name" color='orange' />
                                <Input size="xl" label="Email" color='orange' />
                                <Textarea label="Message" color='orange' />
                            </div>

                            <Button className="mt-6 bg-primary" fullWidth>
                                Send
                            </Button>

                        </form>
                    </Card>
                    <div className='flex gap-5 text-3xl my-5 text-primary'>
                        {
                            ContactDetails.socialAccount.map((element) => {
                                const Icon = element.icon;
                                return (
                                    <a href={element.link} key={element.id}>
                                        <Icon></Icon>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w-full xl:w-7/12'>
                    <div className="grid grid-rows-3">
                        <div className='grid grid-rows-3 xl:grid-cols-3'>
                            <div className='flex flex-col p-5 items-center justify-center gap-5'>
                                <BiSolidMap className='text-4xl text-orange-500 h-1/2'></BiSolidMap>
                                <span className='text-sm h-1/2'>{ContactDetails.address}</span>
                            </div>
                            <div className='flex flex-col p-5 items-center justify-center gap-5'>
                                <FaMobileAlt className='text-4xl text-orange-500 h-1/2'></FaMobileAlt>
                                <span className='text-sm h-1/2'>{ContactDetails.mobileNo}</span>
                            </div>
                            <div className='flex flex-col p-5 items-center justify-center gap-5'>
                                <MdEmail className='text-4xl text-orange-500 h-1/2'></MdEmail>
                                <span className='text-sm h-1/2'>{ContactDetails.emailid}</span>
                            </div>


                        </div>
                        <div className='map relative xl:-mt-[17.5rem] inline-block'><iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2547158278226!2d73.91419611127971!3d18.562551782466336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1681696533582!5m2!1sen!2sin"
                            width={100} height={450} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" className='w-full absolute'></iframe></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact