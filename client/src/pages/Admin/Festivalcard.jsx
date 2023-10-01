import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Festivalcard = () => {
    const [selectedImage, setSelectedImage] = useState("/images/festivalcard/2.jpg");


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


    return (
        <div className="w-full h-full mt-20 px-5 flex flex-col justify-center items-center gap-3">
            <h1 className="text-3xl font-bold xl:mt-28">Festival Card</h1>
            <div className="flex flex-col gap-5"><h1 className="text-xl xl:text-4xl">Click Poster to update Poster</h1>
            </div>
            <div className="flex flex-col xl:flex-row items-center justify-center gap-5 border">

                <div className="relative h-auto xl:w-1/2 xl:m-10 cursor-pointer border">
                    <input
                        type="file"
                        id="fileInput1" // Unique ID for the first input
                        accept="image/*"
                        className="opacity-0 absolute w-full h-full cursor-pointer"
                        onChange={handleFileChange}
                    />
                    <img
                        src={selectedImage}
                        alt="bg"
                        className="xl:h-auto xl:w-auto rounded-xl"
                        onClick={() => document.getElementById("fileInput1").click()}
                    />

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}
export default Festivalcard