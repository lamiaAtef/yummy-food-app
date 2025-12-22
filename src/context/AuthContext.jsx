import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider(props){


    let [loginData,setLoginData] = useState(null)
    let saveLoginData = () => {
        let  encodedToken = localStorage.getItem("token")
        if(encodedToken){
            let decodedToken = jwtDecode(encodedToken)
            setLoginData(decodedToken)
            }
        }
        
    let logOut = () => {
        localStorage.removeItem("token")
        setLoginData(null)
        
    }

       useEffect(()=>{
        if (localStorage.getItem("token")){
            saveLoginData()
        }
    },[])
    return(
        <AuthContext.Provider value={{loginData,saveLoginData,logOut}}>
            {props.children}
        </AuthContext.Provider>

    )


}

