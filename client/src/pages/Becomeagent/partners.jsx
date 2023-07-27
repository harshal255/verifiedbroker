import React from 'react'
import Partners from '../../api/Partners'

const partners = () => {
    return (
        <div className='flex flex-col gap-10 items-center'>
            <h1 className='text-3xl'>Partners</h1>
            <span className='text-base'>Most calendars are designed for teams. Slate is designed for freelancers</span>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>{
                Partners.map((element) => {
                    return (
                        <div key={element.id} className='border flex flex-col items-center justify-center p-5 gap-5'>
                            <h1>{element.title}</h1>
                            <img src={element.img} alt={element.title} />

                        </div>

                    )
                })
            }

            </div>
            <div className="flex gap-2 justify-center items-center">
                <button className="my-2 flex text-white bg-primary border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-primaryhover duration-300 hover:translate-y-2">
                    Try For Free
                </button>
            </div>
        </div>
    )
}

export default partners
