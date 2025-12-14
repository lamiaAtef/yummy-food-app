import React from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"

export default function RecipeData() {
  return (
    <>
      <Header title={"Recipes Items"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerImg}/>
      <h2>recipes list</h2>
      
    </>
  )
}
