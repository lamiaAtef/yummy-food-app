import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import axiosClient from '../api/axiosClient';




export const RecipesContext = createContext();
 
export default function RecipesContextProvider(props) {
    const [recipesList, setRecipesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tags,setTags] = useState(null)
    const [oneRecipe,setOneRecipe] = useState()
    const [organicRecipesList,setOrganicRecipesList] = useState([])
    
    const getRecipes = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/Recipe/`
      );
      setRecipesList(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const deleteRecipe = async (id) => {
    try {
      await axiosClient.delete(`/Recipe/${id}`);
      setRecipesList((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  // ✅ UPDATE
  const updateRecipe = async (id, data) => {
    try {
      const res = await axiosClient.put(`/Recipe/${id}`, data);
       getRecipes()

        //   setRecipesList((prev) =>
        // prev.map((r) => (r.id === id ? res.data.data : r))
     // );
    } catch (err) {
      setError(err);
    }
  };

  const getTags = async () =>{
    try {
      let response = await axiosClient("/tag/")
      setTags(response.data)
      
    } catch (error) {
      setError(error)
    }
  }
  const addRecipe = async(data) => {
      try {
        let response = await axiosClient.post("/Recipe/",data)
        getRecipes()

        // console.log(response)
        
      } catch (error) {
        console.log("error")
          console.log(error.response?.data || error.message)

      }
  }
  const getRecipeById = async(id) => {
    try {
      let response = await axiosClient.get(`/Recipe/${id}`)
      return(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // auto fetch
  useEffect(() => {
    getRecipes();
  }, []);
  return (
      <>
        <RecipesContext.Provider value={{ recipesList,
                loading,
                error,
                getRecipes,
                deleteRecipe,
                updateRecipe,
                getTags,
                tags,
                addRecipe,
                getRecipeById,}}>
            {props.children}
        </RecipesContext.Provider>
      </>
    )
}
