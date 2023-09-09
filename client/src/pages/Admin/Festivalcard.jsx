import { useState } from "react";
import { Textarea, Button } from "@material-tailwind/react";
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from 'react-icons/ai'
const Festivalcard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Perform any additional logic with the selected file
    };
    const handleClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };



    return (
        <div className="w-full h-full mt-20 px-5 lg:mx-20">
            <h1 className="text-3xl font-bold xl:mt-28">Festival Card</h1>
            <div className="flex flex-col xl:flex-row items-center gap-5 ">
                <div className="relative h-auto xl:w-1/2 xl:m-10 cursor-pointer" onClick={handleClick}>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <img src="/images/festivalcard/2.jpg" alt="bg" className="xl:h-auto xl:w-auto  rounded-xl" />

                </div>
                <div className="flex flex-col gap-5"><h1 className="text-xl xl:text-4xl">Click Poster to update Poster</h1>
                    <div className="flex justify-evenly gap-3" >
                        <div>
                            <Button variant="gradient" color="orange" className="flex items-center gap-3">
                                <AiOutlineCloudDownload className="h-6 w-6" />
                                Download Poster
                            </Button>
                            <input type="file" className="hidden" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Festivalcard