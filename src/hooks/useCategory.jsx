import React from 'react'
import UseFetch from './useFetch'

export default function UseCategory() {
  
        const{data,error,loading} = UseFetch(
            "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=1&pageNumber=10",
             {
                    headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
        })
             
   return {
    categoriesList: data?.data || [],
    loading,
    error,
  };
  
}
