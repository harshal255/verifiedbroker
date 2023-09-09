import { Textarea, Button, Card, Input } from "@material-tailwind/react";
import { AiOutlineCloudDownload } from 'react-icons/ai'
const Festivalcard = () => {

    return (

        <div className="w-4/5 h-full xl:ml-[17.5rem] p-5 flex flex-col gap-5">

            <div className="flex flex-col xl:flex-row items-center gap-5 justify-center">

                <div className="flex flex-col gap-5">
                    <h1 className="text-xl xl:text-3xl font-bold">Enter Your details for download poster</h1>
                    <Card color="transparent" shadow={false}>

                        <form className="mt-8 mb-2 w-60 xl:w-full max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Name" />
                                <Input size="lg" label="Email" />
                                <Textarea color="orange" label="Enter text" />
                                <input type="file" />
                                <Button variant="gradient" color="orange" className="flex items-center gap-3 justify-center">
                                    <AiOutlineCloudDownload className="h-6 w-6" />
                                    Download Poster
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Festivalcard