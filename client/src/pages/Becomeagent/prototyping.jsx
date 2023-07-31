import React from 'react'
import { useState } from 'react';
import { Input } from '@material-tailwind/react';


const prototyping = () => {

    const [email, setEmail] = useState("");
    const onChange = ({ target }) => setEmail(target.value);
    return (
        <div className='flex flex-col lg:flex-row items-center justify-evenly gap-5 my-5 lg:my-10'>
            <div>
                <img src="/images/prototype.png" alt="" />
            </div>
            <div className='flex flex-col gap-2 text-start'>
                <span className='font-bold text-base'>At your fingertips</span>
                <h1 className='text-4xl'>Lightning fast prototyping</h1>
                <span className='font-bold text-base'>Subscribe to our Newsletter</span>
                <span className='font-light text-base'>Available exclusivery on Figmaland</span>
                <div className="relative flex w-full max-w-[24rem] items-center justify-center gap-4">
                    <Input
                        color='orange'
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={onChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <div className="flex gap-2 justify-center">
                        <button className="my-2 flex text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-primaryhover duration-300 hover:translate-y-2" disabled={!email}>
                            Suscribe
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default prototyping
