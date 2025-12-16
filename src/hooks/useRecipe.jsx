import React from 'react'
import UseFetch from './useFetch'

export default function UseRecipe() {
      const{data,error,loading} = UseFetch(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=5&pageNumber=1",
        {
            headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })

  return {
    recipesList: data?.data || [],
    loading,
    error,
  };
}

