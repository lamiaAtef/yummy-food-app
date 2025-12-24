import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';



export const CategoryContext = createContext();
 
export default function CategoryContextProvider(props) {
    const [categoryList, setCategoryList] = useState([]);
    const[organicCategoryList,setOrganicCategoryList] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); const getCategory =async () => {  
      setLoading(true)
      try{
          let response = await axiosClient.get(`/api/v1/Category/`)
          setCategoryList(response.data.data)
          setOrganicCategoryList(response.data.data)
      }
      catch(error){
        setError(error)
      }
      finally{
        setLoading(false)
      }
  
 
  
    }
    const getCategoryById =async (id) => {  
      setLoading(true)
      try{
          let response = await axiosClient.get(`/api/v1/Category/${id}`)
          return response.data
      }
      catch(error){
        setError(error)
      }
      finally{
        setLoading(false)
      }
  
 
  
    }

    const deleteCategory =async (id) => {
        try {
        await axiosClient.delete(`/api/v1/Category/${id}`);
        toast.success("category deleted successfuly");
      
        setCategoryList((prev) => prev.filter((r) => r.id !== id));
        console.log("done")
      } catch (err) {
        setError(err);
        toast.error("Category can't be deleted")
      }
    }
    const updateCategory = async (id, data) => {
    try {
      const res = await axiosClient.put(`/api/v1/Category/${id}`, data);
     toast.success("category updated successfuly");

      getCategory()
      // setCategoryList((prev) =>
      //   prev.map((r) => (r.id === id ? res.data.data : r))
      // );
    } catch (err) {
      toast.error("Category can't be updated");

      setError(err);
    }
  };
   const addCategory = async (data) => {
    try {
      const res = await axiosClient.post(`/api/v1/Category/`, data);
      toast.success("category added successfully")
      getCategory()

      
    
    } catch (err) {
      setError(err);
      toast.error("category can't be added")
      
    }
  };
  const searchCategory = (data) => {
      const filter = organicCategoryList.filter((cat)=>cat.name.toLowerCase().includes(data.toLowerCase()))  
      setCategoryList(filter)
  
    }

    useEffect(() => {
      getCategory();
      
    }, []);

  return (
    <>
       <CategoryContext.Provider value={{categoryList, loading,error,getCategoryById,getCategory,deleteCategory,updateCategory,addCategory,searchCategory}}>
            {props.children}
        </CategoryContext.Provider>
    </>
  )
}
