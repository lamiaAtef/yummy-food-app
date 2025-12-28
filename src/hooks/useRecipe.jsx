// import { useEffect, useState } from "react";
// import axiosClient from "../api/axiosClient";

// export default function useRecipe() {
//   const [recipesList, setRecipesList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const[tags,setTags] = useState(null)
//   const[oneRecipe,setOneRecipe] = useState()

//   // ✅ GET
//   const getRecipes = async (pageSize = 5, pageNumber = 1) => {
//     setLoading(true);
//     try {
//       const res = await axiosClient.get(
//         `/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`
//       );
//       setRecipesList(res.data.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DELETE
//   const deleteRecipe = async (id) => {
//     try {
//       await axiosClient.delete(`/api/v1/Recipe/${id}`);
//       setRecipesList((prev) => prev.filter((r) => r.id !== id));
//     } catch (err) {
//       setError(err);
//     }
//   };

//   // ✅ UPDATE
//   const updateRecipe = async (id, data) => {
//     try {
//       const res = await axiosClient.put(`/api/v1/Recipe/${id}`, data);
//        getRecipes()

//         //   setRecipesList((prev) =>
//         // prev.map((r) => (r.id === id ? res.data.data : r))
//      // );
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const getTags = async () =>{
//     try {
//       let response = await axiosClient("/api/v1/tag/")
//       setTags(response.data)
      
//     } catch (error) {
//       setError(error)
//     }
//   }
//   const addRecipe = async(data) => {
//       try {
//         let response = await axiosClient.post("/api/v1/Recipe/",data)
//         getRecipes()

//         // console.log(response)
        
//       } catch (error) {
//         console.log("error")
//           console.log(error.response?.data || error.message)

//       }
//   }
//   const getRecipeById = async(id) => {
//     try {
//       let response = await axiosClient.get(`/api/v1/Recipe/${id}`)
//       return(response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // auto fetch
//   useEffect(() => {
//     getRecipes();
//   }, []);

//   return {
//     recipesList,
//     loading,
//     error,
//     getRecipes,
//     deleteRecipe,
//     updateRecipe,
//     getTags,
//     tags,
//     addRecipe,
//     getRecipeById,
//   };
// }
