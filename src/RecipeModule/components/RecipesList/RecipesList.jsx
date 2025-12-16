import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import axios from 'axios'
import NotFound from '../../../SharedComponents/components/NotFound/NotFound'
import useRecipe from '../../../hooks/useRecipe'
import { BeatLoader } from 'react-spinners'

export default function RecipesList() {

   const { recipesList, loading, error } = useRecipe();
   

  if (loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 


 
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
          <td colSpan="6" className="text-center">
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
