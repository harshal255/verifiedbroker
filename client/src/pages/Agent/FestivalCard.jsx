import { Button, Card, Avatar } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Festivalcard = () => {
    const [selectedImage, setSelectedImage] = useState("/images/festivalcard/2.jpg");
    const [userData, setUserData] = useState({
        name: "",
        mobile: "",
        email: "",
    })
    const [records, setRecords] = useState({});
    const [posterDataURL, setPosterDataURL] = useState(null);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        //[name] is dynamic data in below object
        setUserData({ ...userData, [name]: value })
        console.log(userData);
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (userData.email && userData.mobile && userData.name) {
            setRecords(userData);
            setUserData({
                name: "",
                mobile: "",
                email: "",
            })
        }
        console.log(userData, records);
    }


    const handleFileChange = (event) => {
        toast.success('called handlefile change', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };
    const generateCompositeImage = () => {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions based on the size of your poster
        canvas.width = 1560;
        canvas.height = 900;

        // Draw the background image (selectedImage)
        const backgroundImage = new Image();
        backgroundImage.src = "/images/festivalcard/2.jpg"; // Use the selected image URL
        backgroundImage.onload = () => {
            // Once the background image is loaded, draw it on the canvas
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            // Customize the drawing for other elements (images, text, etc.)

            // Add a logo image
            const logoImage = new Image();
            logoImage.src = selectedImage; // Specify the path to your logo image
            logoImage.onload = () => {
                // Once the logo image is loaded, draw it on the canvas
                ctx.drawImage(logoImage, 10, 10, 200, 200); // Adjust the position and size as needed

                // Add text
                ctx.fillStyle = "white"; // Text color
                ctx.font = "24px Arial"; // Font size and type
                ctx.textAlign = "left"; // Text alignment
                ctx.textBaseline = "top"; // Vertical alignment
                ctx.fillText(records.name || "", 20, 220); // Adjust the position as needed
                ctx.fillText(records.email || "", 20, 250); // Adjust the position as needed
                ctx.fillText(records.mobile || "", 20, 280); // Adjust the position as needed

                // Convert the canvas to a data URL
                const dataURL = canvas.toDataURL("image/png");
                setPosterDataURL(dataURL);

                // Create a download link
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "poster.png"; // Specify the file name

                // Trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up
                document.body.removeChild(link);
            };
        };
    };



    return (

        <div className="w-4/5 h-full xl:ml-[17.5rem] p-5 flex flex-col gap-5">

            <div className="flex flex-col items-center gap-5 justify-center">

                <div className="flex flex-col gap-5 items-center justify-center">
                    <h1 className="text-xl xl:text-3xl font-bold">Enter Your details for download poster</h1>
                    <Card color="transparent" shadow={false} className="flex items-center justify-center">
                        <div className="relative h-auto  cursor-pointer rounded-full">
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*" // Add this to restrict to image files
                                className="opacity-0 absolute w-full h-full cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <Avatar src={selectedImage} size="xxl" alt="avatar" onClick={() => document.getElementById("fileInput").click()}></Avatar>
                        </div>


                        <form className="mt-8 mb-2 w-60 xl:w-full max-w-screen-lg sm:w-96" onSubmit={submitForm}>
                            <div className="mb-4 flex flex-col gap-6">
                                <div className='text-start flex gap-5'>
                                    <label htmlFor="username">Name :</label>
                                    <input type="text" value={userData.name} name='name' onChange={handleInput} className='bg-transparent border text-black' autoComplete='off' />
                                </div>
                                <div className='text-start flex gap-5'>
                                    <label htmlFor="username">Email :</label>
                                    <input type="email" value={userData.email} name="email" onChange={handleInput} className='bg-transparent border text-black' autoComplete='off' />
                                </div>
                                <div className='text-start flex gap-5'>
                                    <label htmlFor="username">Mobile :</label>
                                    <input type="tel" value={userData.mobile} name="mobile" onChange={handleInput} className='bg-transparent border text-black' autoComplete='off' />
                                </div>
                                <div className="flex gap-5">
                                    <Button variant="gradient" color="orange" className="flex items-center gap-3 justify-center" type='submit'>
                                        Submit Details & View your poster
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
                <div className="relative h-auto xl:m-10 cursor-pointer">
                    <img src="/images/festivalcard/2.jpg" alt="bg" className="xl:h-auto xl:w-auto  rounded-xl" />
                    <img src={selectedImage} alt="festivalcard" className="absolute top-3 left-3 xl:top-5 xl:left-5 h-10 w-10 xl:h-20 xl:w-20 rounded-full p-1" />

                    <div className="text-base absolute bottom-0 p-3 bg-white/50 left-0 right-0 mx-auto text-center font-semibold text-black flex justify-around">
                        <div>{records.name && records.name}</div>
                        <div>{records.email && records.email}</div>
                        <div>{records.mobile && records.mobile}</div>
                    </div>
                </div>
                {posterDataURL ? (
                    <div className="relative h-auto xl:m-10 cursor-pointer">
                        <img src={posterDataURL} alt="Generated Poster" className="xl:h-auto xl:w-auto rounded-xl" />
                        {/* Rest of your poster elements */}
                    </div>
                ) : <div>some error while generating image</div>}
                <div className="flex gap-5">
                    <Button variant="gradient" color="orange" className="flex items-center gap-3 justify-center" type='submit' onClick={generateCompositeImage}>
                        <AiOutlineCloudDownload className="h-6 w-6" />
                        Download Poster
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Festivalcard