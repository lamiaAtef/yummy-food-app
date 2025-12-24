import { jwtDecode } from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { RecipesContext } from './RecipesContext'

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

        toast.success("You have logged out successfully");
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

