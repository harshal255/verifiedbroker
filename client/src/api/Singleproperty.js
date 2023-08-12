import { BiBed, BiBath } from 'react-icons/bi'
import { MdOutlineBedroomParent } from 'react-icons/md';
import { MdDateRange } from 'react-icons/md'
import { ImHome } from 'react-icons/im'
import { BiHomeAlt2 } from 'react-icons/bi'
import { TbRulerMeasure } from 'react-icons/tb'


const SingleProperty = {
    Images: [
        {
            id: 1,
            img: "/images/Images/1.jpg",
        },
        {
            id: 2,
            img: "/images/Images/2.jpg",
        },
        {
            id: 3,
            img: "/images/Images/3.jpg",
        },
        {
            id: 4,
            img: "/images/Images/4.jpg",
        },
        {
            id: 5,
            img: "/images/Images/5.jpg",
        },
    ],
    Property: [
        {
            id: 1,
            icon: MdOutlineBedroomParent,
            name: "Bedroom",
            text: 3,

        },
        {
            id: 2,
            icon: BiBath,
            name: "Bath",
            text: 2,

        },
        {
            id: 3,
            icon: MdDateRange,
            name: "Year Built",
            text: 2022,

        },
        {
            id: 4,
            icon: ImHome,
            name: "Garage",
            text: 2,

        },
        {
            id: 5,
            icon: TbRulerMeasure,
            name: "Sqft",
            text: 1200,

        },
        {
            id: 6,
            icon: BiHomeAlt2,
            name: "Property Type",
            text: "Apartment",

        }

    ],
    PropertyDetails: {
        PropertyID: "RT48",
        Garage: 2,
        Price: "$252,000",
        GarageSize: "200 SqFt",
        PropertySize: "1500 Sq Ft",
        YearBuilt: "2022",
        Bathrooms: "3",
        PropertyType: "Apartment",
        Bedrooms: "2",
        PropertyStatus: "For Sale",
    },
    Address: {
        Address: "10425 Tabor St",
        ZipPostalCode: "90034",
        City: "Los Angeles",
        Area: "Brookside",
        State: "California",
        Country: "United States"

    },
    Features: [
        {
            id: 1,
            feature: "Air Conditioning"
        },
        {
            id: 2,
            feature: "Lawn"
        },
        {
            id: 3,
            feature: "Swimming Pool"
        },
        {
            id: 4,
            feature: "Barbeque"
        },
        {
            id: 5,
            feature: "Microwave"
        },
        {
            id: 6,
            feature: "TV Cable"
        },
        {
            id: 7,
            feature: "Dryer"
        },
        {
            id: 8,
            feature: "Outdoor Shower"
        },
        {
            id: 9,
            feature: "Washer"
        },
        {
            id: 10,
            feature: "Gym"
        },
        {
            id: 11,
            feature: "Refrigerator"
        },
        {
            id: 12,
            feature: "WiFi6"
        },
    ],
    Floor: [
        {
            id: 1,
            floor: "First Floor",
            size: "1267 sqft",
            bedrooms: "2",
            bathrooms: "2",
            price: "92099",
            img: "/images/Images/floor1.png",

        },
        {
            id: 2,
            floor: "Second Floor",
            size: "1267 sqft",
            bedrooms: "2",
            bathrooms: "2",
            price: "92099",
            img: "/images/Images/floor2.png",
        },
        {
            id: 3,
            floor: "Third Floor",
            size: "1267 sqft",
            bedrooms: "2",
            bathrooms: "2",
            price: "92099",
            img: "/images/Images/floor3.png",
        },
    ],
    Reviews: [
        {
            id: 1,
            userName: "Bessie Cooper",
            userprofile: "/images/Images/Reviews/users/1.png",
            reviewDate: "12 March 2022",
            reviewcount: 5,
            reviewmessage: "Every single thing we tried with John was delicious! Found some awesome places we would definitely go back to on our trip. John was also super friendly and passionate about Beşiktaş and Istanbul.",
            images: [
                {
                    id: 1,
                    img: "/images/Images/Reviews/1.jpg"
                },
                {
                    id: 2,
                    img: "/images/Images/Reviews/2.jpg"
                },
                {
                    id: 3,
                    img: "/images/Images/Reviews/2.jpg"
                },
            ]
        },
        {
            id: 2,
            userName: "Bessie Cooper",
            userprofile: "/images/Images/Reviews/users/1.png",
            reviewDate: "12 March 2022",
            reviewcount: 3,
            reviewmessage: "Every single thing we tried with John was delicious! Found some awesome places we would definitely go back to on our trip. John was also super friendly and passionate about Beşiktaş and Istanbul.",
            images: [
            ]
        },
        {
            id: 3,
            userName: "Harshal Kahar",
            userprofile: "/images/Images/Reviews/users/1.png",
            reviewDate: "12 March 2026",
            reviewcount: 5,
            reviewmessage: "Every single thing we tried with John was delicious! Found some awesome places we would definitely go back to on our trip. John was also super friendly and passionate about Beşiktaş and Istanbul.",
            images: [
                {
                    id: 1,
                    img: "/images/Images/Reviews/1.jpg"
                },
                {
                    id: 2,
                    img: "/images/Images/Reviews/2.jpg"
                },
                {
                    id: 3,
                    img: "/images/Images/Reviews/2.jpg"
                },
                {
                    id: 4,
                    img: "/images/Images/Reviews/1.jpg"
                },
                {
                    id: 5,
                    img: "/images/Images/Reviews/2.jpg"
                },
                {
                    id: 6,
                    img: "/images/Images/Reviews/2.jpg"
                },
            ]
        },
    ]
}

export default SingleProperty;