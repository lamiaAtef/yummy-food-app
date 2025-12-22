import React, { useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import axios from 'axios'
import NotFound from '../../../SharedComponents/components/NotFound/NotFound'
import useRecipe from '../../../hooks/useRecipe'
import { BeatLoader } from 'react-spinners'
import DropDownButton from '../../../SharedComponents/components/DropDownButton/DropDownButton'
import DeleteConfirmation from '../../../SharedComponents/components/DeleteConfirmation/DeleteConfirmation'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RecipesList() {

   const {  recipesList,
    loading,
    error,
    getRecipes,
    deleteRecipe,
    updateRecipe, } = useRecipe();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    let navigate = useNavigate()
    let locatoin = useLocation()

const openDeleteModal = (id) => {
  setSelectedId(id);
  setShowDeleteModal(true);
};


const closeDeleteModal = () => {
  setSelectedId(null);
  setShowDeleteModal(false);
};

  const [openId, setOpenId] = useState(null);
  const handleToggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };
 
useEffect(() => {
  if (location.state?.refetch) {
    getRecipes();
  }
}, [location.state]);



  if (loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 


 
  return (
    <>
       <Header title={"Recipes Items"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerImg}/>
        <div className='d-flex justify-content-between p-3'>
          <div>
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div>
            <button className='main_dash_btn' onClick={()=>navigate("/dashboard/recipe-date")}>Add New Item</button>
          </div>
        </div>
      <div >
              <table className="table">
                <thead  style={{background: "#E2E5EB"}}>
                  <tr >
                    <th  className='customTableColor' scope="col">Item Name</th>
                    <th className='customTableColor'  scope="col">image</th>
                    <th  className='customTableColor' scope="col">Price</th>
                    <th  className='customTableColor' scope="col">Description</th>
                    <th  className='customTableColor' scope="col">Tag</th>
                    <th  className='customTableColor' scope="col">Category</th>
                    <th  className='customTableColor' scope="col">action</th>
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
          <td className=' '>
            <DropDownButton

              actions={{
                view: {
                  label: "View",
                  icon: "fa-solid fa-eye",
                  onClick: () => handleView(recipe.id),
                },
                edit: {
                  label: "Edit",
                  icon: "fa-solid fa-pen",
                  onClick: () => navigate(`/dashboard/recipe-date/${recipe.id}`),
                },
                delete: {
                  label: "Delete",
                  icon: "fa-solid fa-trash",
                  onClick: () => openDeleteModal(recipe.id),
                  class:"text-danger"
                },
              }}
            />
          </td>
        </tr>
      ))
    : (
        <tr>
          <td colSpan="7" className="text-center">
            <NotFound />
          </td>
        </tr>
      )
  }
</tbody>

              </table>
              <DeleteConfirmation
                  show={showDeleteModal}
                  deletedElement="recipe"
                  onClose={closeDeleteModal}
                  onConfirm={() => {
                    deleteRecipe(selectedId);
                    closeDeleteModal();
                }}
              />
            
            </div>
    </>
  )
}
