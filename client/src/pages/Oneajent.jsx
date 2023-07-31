import { AiFillStar } from 'react-icons/ai';
import { BiSolidPhoneCall } from 'react-icons/bi'
import { BsFillPhoneFill } from 'react-icons/bs'
import React from 'react'
import { BsTwitter, BsLinkedin, BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Properties from '../api/Property';
import { BiBed, BiBath } from 'react-icons/bi';
import { TbRulerMeasure } from 'react-icons/tb';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Rating,
  Option,
  Select
} from "@material-tailwind/react";


const Oneajent = () => {
  return (
    <div className='flex h-full justify-start border border-black flex-col xl:mx-20'>
      <div className="bg-red-50/50 w-full max-h-fit xl:h-56 mt-20">
        <div className="flex flex-col xl:flex-row m-10 gap-10 items-center">
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="" className='rounded-full h-40 w-40' />
          <div className="flex flex-col gap-2">
            <h1 className='text-3xl font-bold'>Ali Tufan</h1>
            <span className='text-sm text-gray-600'>Compnany Agent at <b>Modern House Real Estate</b></span>
            <div className="flex text-sm gap-2 flex-wrap items-center justify-center">
              <span className='flex gap-1'><AiFillStar className='h-5 w-5 text-yellow-700' /> 5.0 · </span>
              <span>49 Reviews</span>
              <span>|</span>
              <span className='flex gap-2 items-center'><BiSolidPhoneCall />+848 032 03 01</span>
              <span>|</span>
              <span className='flex gap-2 items-center'><BsFillPhoneFill />+848 032 03 01</span>
            </div>
            <div className="flex gap-5 m-auto">
              <Link to=""> <BsTwitter /></Link>
              <Link to=""><BsLinkedin /></Link>
              <Link to=""><AiFillInstagram /></Link>
              <Link to=""> <BsFacebook /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-2/3 border border-black xl:m-5 flex flex-col gap-3">
          <h1 className='text-start mx-5 font-bold '>About Ali Tufan</h1>
          <p className='mx-5 text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus officia animi excepturi alias eveniet optio veritatis rerum nemo aut, ut ratione non dolorum minima odit nobis, quae debitis nulla totam? Maiores necessitatibus sed aperiam odit iste optio quibusdam sapiente aliquid. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi natus incidunt repellendus, quidem perspiciatis cum, fugit necessitatibus velit saepe eos similique sunt deleniti nemo quasi voluptatum vitae consequuntur? Reprehenderit tempore perspiciatis repudiandae eaque iste deserunt omnis velit maiores, saepe ad!</p>

          <hr className='border-gray-500' />
          <h1 className='text-start mx-5'>listning 5</h1>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 m-5">
            {Properties.filter((item) => item.name.toLowerCase() === "ali tufan").map(
              (element) => {
                return (
                  <div className="flex flex-col" key={element.id}>
                    <div className="relative w-fit h-fit overflow-hidden rounded-lg">
                      <img
                        src={element.img}
                        alt={element.title}
                        className="hover:scale-110 duration-300 transition-all transform hover:-rotate-1 rounded-xl"
                      />
                      <div className="absolute z-10 bottom-5 left-2 text-black bg-white p-2 rounded-lg font-semibold">
                        {element.price} $/month
                      </div>
                    </div>
                    <div className="my-2 flex flex-col gap-2">
                      <span className="font-semibold text-start ml-2">{element.title}</span>
                      <span className="font-light text-start ml-2 text-sm text-gray-600">
                        {element.address.city},{element.address.country},
                        {element.address.state}
                      </span>
                      <span className="flex justify-evenly text-sm">
                        <span className="flex items-center">
                          <BiBed />
                          {element.bed} Bed
                        </span>
                        <span className="flex items-center">
                          <BiBath />
                          {element.bath} Bath
                        </span>
                        <span className="flex items-center">
                          <TbRulerMeasure />
                          {element.sqft} Sqft
                        </span>
                      </span>
                      <hr className="border-gray-800" />
                      <div className="flex justify-evenly">
                        <span className="text-sm">{element.category}</span>
                        <span className="text-sm">
                          {element.year.startingyear}-{element.year.endingyear}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

        </div>
        <div className="w-full flex flex-col xl:w-1/3 xl:pr-10 gap-5">
          <Card color="transparent" shadow={false} className='border border-black w-[85vw] xl:w-fit xl:px-10 py-10 xl:-mt-28 bg-white'>
            <Typography variant="h4" color="blue-gray">
              Contact Form
            </Typography>

            <form className="mt-8 mb-2 max-w-fit xl:w-96 flex flex-col gap-3 ">
              <div className="mb-4 flex flex-col gap-2 xl:gap-6 items-center justify-center ml-10 xl:ml-0">
                <div className="w-36 xl:w-72 text-center"><Input label="Name" /></div>
                <div className="w-36 xl:w-72 text-center"><Input label="Email" /></div>
                <div className="w-36 xl:w-72 text-center"><Input type="password" label="Password" /></div>
                <div className="w-36 xl:w-72 text-center">
                  <Textarea label="Message" />
                </div>
              </div>

              <Button className="mt-6 w-32 ml-10 xl:ml-0" fullWidth>
                Register
              </Button>
            </form>
          </Card>

          <Card className='flex flex-col gap-4 justify-center items-center bg-white py-10 border border-black'>
            <h1 className='text-xl xl:text-3xl font-semibold text-center xl:text-start'>Agency Information</h1>
            <Typography className="justify-evenly"><b className='font-semibold'>Broker address</b>:House on the Northridge </Typography>
            <Typography className="justify-evenly"><b className='font-semibold'>Office</b>:House on the Northridge </Typography>
            <Typography className="justify-evenly"><b className='font-semibold'>Mobile</b>:House on the Northridge </Typography>
            <Typography className="justify-evenly"><b className='font-semibold'>Fax</b>:House on the Northridge </Typography>
            <Typography className="justify-evenly"><b className='font-semibold'>Websites</b>:House on the Northridge </Typography>
            <Typography className="justify-evenly"><b className='font-semibold'>Member since</b>:House on the Northridge </Typography>

          </Card>
        </div>

      </div>
      <div className="w-full">
        <div className='mx-10 flex flex-col xl:flex-row justify-between'><div className='flex  items-center gap-5'><AiFillStar /> 5.0 · 3 Reviews</div> <div className="flex items-center justify-center gap-2">
          <span className="w-1/2">Sort by</span>
          <Select label="All Cities">
            <Option>Newest</Option>
            <Option>Best Seller</Option>
            <Option>Best match</Option>
            <Option>Price Low</Option>
            <Option>Price High</Option>
          </Select>
        </div></div>
        <article className="lg:w-1/2 m-auto text-start my-5">
          <div className="flex items-center mb-4 space-x-4 ">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80" alt="" />
            <div className="space-y-1 font-medium dark:text-white">
              <p>Kartik Rathod <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>
            </div>
          </div>
          <Rating value={5} readonly />
          <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United Kingdom on <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
          <p className="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>

        </article>
        <hr />
        <article className="lg:w-1/2 m-auto text-start my-5">
          <div className="flex items-center mb-4 space-x-4 ">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80" alt="" />
            <div className="space-y-1 font-medium dark:text-white">
              <p>jose leos <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>
            </div>
          </div>
          <Rating value={5} readonly />
          <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United Kingdom on <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
          <p className="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>

        </article>
        <hr />

        {/* for Review */}
        <div className="flex flex-col gap-5 items-center justify-center my-10 w-full -ml-10">
          <h1 className='font-bold text-3xl text-start'>Leave a Review</h1>
          <div className="w-40 xl:w-96 text-center"><Input label="Email" color='orange' /></div>
          <div className="w-40 xl:w-96 text-center"><Input label="Title" color='orange' /></div>
          <div className="flex items-center justify-between w-32 xl:w-96 gap-2">
            <span className="w-1/2">Rating</span>
            <Select label="Rating" color='orange'>
              <Option color='orange'>1 star</Option>
              <Option color='orange'>2 star</Option>
              <Option color='orange'>3 star</Option>
              <Option color='orange'>4 star</Option>
              <Option color='orange'>5 star</Option>
            </Select>
          </div>
          <div className="w-40 xl:w-96 text-center">
            <Textarea label="review" color='orange' />
          </div>
          <Button className="w-32 text-center bg-orange-600" fullWidth>
            Add Review
          </Button>
        </div>

      </div>

    </div >
  )
}

export default Oneajent