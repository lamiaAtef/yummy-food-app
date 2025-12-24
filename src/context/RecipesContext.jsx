import { createContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { toast } from 'react-toastify';
export const RecipesContext = createContext(null);

export default function RecipesContextProvider(props) {

  const [recipesList, setRecipesList] = useState([]);
  const[organicRecipesList,setOrganicRecipesList] = useState([])
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState(null);

  // ✅ GET ALL
  const getRecipes = async (pageSize = 5, pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      setRecipesList(res.data.data);
      setOrganicRecipesList(res.data.data)
    } catch (err) {
      setError(err);
      toast.error("There is a problem")
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const deleteRecipe = async (id) => {
    try {
      await axiosClient.delete(`/api/v1/Recipe/${id}`);
      toast.success("Recipe deleted successfully")
      setRecipesList(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      toast.error(" this recipe  can't be deleted ")
      setError(err);
    }
  };

  // ✅ UPDATE
  const updateRecipe = async (id, data) => {
    try {
      await axiosClient.put(`/api/v1/Recipe/${id}`, data);
      toast.success("Recipe updated successfully")

      getRecipes();
    } catch (err) {
      toast.error("Recipe can't be updated")

      setError(err);
    }
  };

  // ✅ ADD
  const addRecipe = async (data) => {
    try {
      await axiosClient.post("/api/v1/Recipe/", data);
      toast.success("Recipe added successfully")

      getRecipes();

    } catch (err) {
      toast.error("Recipe can't be deleted ")

      setError(err);
    }
  };
  // get recipeBy id
  const getRecipeById = async(id) =>{
     try {
      let response = await axiosClient.get(`/api/v1/Recipe/${id}`);
      return response.data
    } catch (err) {
      setError(err);
    }
  }

  // ✅ TAGS
  const getTags = async () => {
    try {
      const res = await axiosClient.get("/api/v1/tag/");
      setTags(res.data);
    } catch (err) {
      setError(err);
    }
  };


  const searchRecipes = (data) =>{
       const filter = organicRecipesList.filter((r)=>r.name.toLowerCase().includes(data.toLowerCase()))  
      setRecipesList(filter)
  }

  // auto fetch
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        recipesList,
        loading,
        error,
        tags,
        getRecipeById,
        getRecipes,getTags, addRecipe,updateRecipe,deleteRecipe,searchRecipes,
      }}
    >
    {props.children}
    </RecipesContext.Provider>
  );
}
