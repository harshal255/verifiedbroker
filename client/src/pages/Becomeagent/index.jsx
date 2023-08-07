import { Link } from 'react-router-dom';

const index = () => {
    return (
        <div className="lg:mt-10">
            <img src="/images/bg.png" alt="bg" className="absolute -z-10 w-screen opacity-20 lg:opacity-70  lg:-mt-[12.5rem] mx-0 px-0" />
            <div className="md:p-10 lg:p-48 flex flex-col justify-center gap-5 my-20 items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-800 overflow-clip">Become a Verified Broker with Our Platform</h1>
                <span className="text-base text-gray-800">One  Of the Best Property selling and Buying Marketplace</span>
                <div className="flex gap-2 justify-center">
                    <Link to="/brokersignup">
                        <button className="my-2 flex text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-primaryhover duration-300 hover:translate-y-2">
                            Sign up as a Broker
                        </button>
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default index