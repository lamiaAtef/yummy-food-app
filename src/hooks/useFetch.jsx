import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function UseFetch(url, option = {}) {
    const[loading,setLoading]=useState(true)
    const[data,setData]=useState(null)
    const[error,setError]=useState(null)
    let fetchData = async() =>{
        try{
            let response = await axios.get(url)
            setData(response.data)
         
            //toast.success(response.data.message)
        }
        catch(error){
            setError(error)
            toast.error(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[url])
  return {data,loading,error}
   
}
