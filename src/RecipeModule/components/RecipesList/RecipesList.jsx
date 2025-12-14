import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import axios from 'axios'
import NotFound from '../../../SharedComponents/components/NotFound/NotFound'

export default function RecipesList() {
   const [recipesList,setRecipesList] = useState([])
  const getAllRecipes = async()=> {
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=5&pageNumber=1",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      setRecipesList(response.data.data);
      console.log(response.data.data)
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  useEffect(()=>{
    getAllRecipes()
  },[])
  return (
    <>
       <Header title={"Recipes Items"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerImg}/>
      <div >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Tag</th>
                    <th scope="col">Category</th>
                  </tr>
                </thead>
              <tbody>
  {
    recipesList.length > 0 
    ? recipesList.map(recipe => (
        <tr key={recipe.id}>
          <td>{recipe?.name}</td>
          <td>
            <img 
              src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} 
              alt="" 
              style={{width: "80px", borderRadius: "8px"}} 
            />
          </td>
          <td>{recipe?.price}</td>
          <td>{recipe?.description}</td>
          <td>{recipe?.tag?.name}</td>
          <td>{recipe.category[0]?.name}</td>
        </tr>
      ))
    : (
        <tr>
          <td colSpan="6">
            <NotFound />
          </td>
        </tr>
      )
  }
</tbody>

              </table>
             
            </div>
    </>
  )
}
