
import DashbordHeader from '../../components/AgentDashboard/Header'

const CTPVD = () => {
    return (
        <>
            <DashbordHeader></DashbordHeader>
            <div className='w-4/5 h-full xl:ml-[17.5rem] border border-black p-5 flex flex-col gap-5'>

                <iframe
                    src="https://tpvd.openprp.in/ctpvd/index.html?geo_extent=35BOX"
                    width="100%"
                    height="500px"
                    frameBorder="0"
                    scrolling="no"
                />
            </div>
        </>
    )
}

export default CTPVD