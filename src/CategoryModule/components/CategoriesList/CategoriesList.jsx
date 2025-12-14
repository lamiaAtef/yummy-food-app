import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import axios from 'axios'
import NotFound from '../../../SharedComponents/components/NotFound/NotFound'
export default function CategoriesList() {
  const [categoriesList,setCategoriesList] = useState([])
  const getAllCategories = async()=> {
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      setCategoriesList(response.data.data);
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  useEffect(()=>{
    getAllCategories()
  },[])
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
    categoriesList.length  > 0 
    ? categoriesList.map(category => (
        <tr key={category.id}>
          <th >{category.id}</th>
          <td>{category.name}</td>
          <td>{category.creationDate}</td>
        </tr>
      ))
    : <NotFound/>
  }
</tbody>

        </table>
       
      </div>

    </>
  )
}
