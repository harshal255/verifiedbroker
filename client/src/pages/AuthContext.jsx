import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';



const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         let config = {
    //             method: 'get',
    //             maxBodyLength: Infinity,
    //             url: `http://localhost:3000/api/admin/user/${localStorage.getItem("uId")}`,
    //             withCredentials: true
    //         };

    //         axios.request(config)
    //             .then((response) => {
    //                 console.log(response);
    //                 setUser(response.data.user);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    //     fetchData();
    // }, [Cookies.get("tokenjwt")]);
    useEffect(() => {
        async function fetchData() {
            let token = Cookies.get("tokenjwt");

            if (token) {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/api/admin/user/${localStorage.getItem("uId")}`,
                    withCredentials: true
                };

                axios.request(config)
                    .then((response) => {
                        console.log(response);
                        setUser(response.data.user);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else {
                console.log("Error");
            }
        }
        fetchData();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;