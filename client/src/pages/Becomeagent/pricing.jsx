import PriceCard from './priceCard';
import priceCard from '../../api/PriceCard'



const pricing = () => {
    return (
        <div className='bg-black text-white flex flex-col gap-10 items-center my-10 py-10'>
            <h1 className='text-3xl'>Pricing</h1>
            <span className='text-base'>Most calendars are designed for teams. Slate is designed for freelancers</span>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {
                    priceCard.map((element) => {
                        return (
                            <PriceCard key={element.id} plan={element.plan} price={element.price} features={element.features}></PriceCard>
                        )
                    })
                }
                




            </div>

        </div>
    )
}

export default pricing
