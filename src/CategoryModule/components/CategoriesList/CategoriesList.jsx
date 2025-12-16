import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import axios from 'axios'
import NotFound from '../../../SharedComponents/components/NotFound/NotFound'
import { BeatLoader } from 'react-spinners'
import useCategory from '../../../hooks/useCategory'
export default function CategoriesList() {

  const { categoriesList, loading, error } = useCategory();

  if (loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 

 
 
  return (
    <>
      <Header title={"Recipes Items"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerImg}/>
      <div >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">creationDate</th>
            </tr>
          </thead>
          <tbody>
  {
    categoriesList?.length  > 0 
    ? categoriesList.map(category => (
        <tr key={category.id}>
          <th >{category.id}</th>
          <td>{category.name}</td>
          <td>{category.creationDate}</td>
        </tr>
      ))
    : ( <tr>
      <td colSpan="6" className="text-center">
       <NotFound/> 
      </td>
    </tr>)
  }
</tbody>

        </table>
       
      </div>

    </>
  )
}
