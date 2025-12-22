import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedComponents/components/Header/Header'
import headerImg from "../../../assets/images/h2.png"
import axios from 'axios'
import NotFound from '../../../SharedComponents/components/NotFound/NotFound'
import { BeatLoader, CircleLoader } from 'react-spinners'
import DeleteConfirmation from '../../../SharedComponents/components/DeleteConfirmation/DeleteConfirmation'
import DropDownButton from '../../../SharedComponents/components/DropDownButton/DropDownButton'
import { CategoryContext } from '../../../context/CategoryContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import NoData from '../../../SharedComponents/components/NoData/NoData'

export default function CategoriesList() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    //  if(!id){
    //   addCategory(categoryText)
    // }
    // else{
    //   updateCategory(id,categoryText)
    // }
    setShow(false)
  };
 

const {categoryList,loading,error,getCategory,deleteCategory,updateCategory,addCategory,getCategoryById,} = useContext(CategoryContext)

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [openId, setOpenId] = useState(null);
const[modalTitle,setModalTitle] = useState()

const {register, handleSubmit, formState:{errors}, reset} = useForm()

const[categoryId,setCategoryId] = useState(null)


 const handleShow = async(id) => {
  setShow(true)

  if(id){
    setModalTitle("update")
    setCategoryId(id)
    let updatedCategory = await getCategoryById(id)
    reset({
        name: updatedCategory.name || "",
      })
    
  }
  else{
    setCategoryId(null)
    setModalTitle("add")
      reset({
        name: "",
      })
  }

  };

 const openDeleteModal = (id) => {
   setSelectedId(id);
   setShowDeleteModal(true);
 };
 
 const closeDeleteModal = () => {
   setSelectedId(null);
   setShowDeleteModal(false);
 };
 
   const handleToggle = (id) => {
     setOpenId(prev => (prev === id ? null : id));
   };

  
 if (loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 
   
 const onSubmit = (data) => {
  console.log("tmaaaaaam")
  console.log(data )
   if(!categoryId){
      addCategory(data)
    }
    else{
      console.log(categoryId,data)
      updateCategory(categoryId,data)
    }
    setShow(false)

 }
 
 
  return (
    <>
      <Header title={"Category Items"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgUrl={headerImg}/>
        <div className='d-flex justify-content-between p-3'>
          <div>
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div>
            <button className='main_dash_btn' onClick={()=>{setCategoryId(null),handleShow(null)}}>Add New Item</button>
          </div>
        </div>
      <div >
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton >
              <Modal.Title>{`${modalTitle} Category`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form  onSubmit={handleSubmit(onSubmit)}>
                  <input type='text'
                    placeholder='Category Name '
                      className='form-control' 
                      style={{background: "#F7F7F7"}}
                      {...register("name",{required:"name is required"})}
                      />
                      {errors.name && <span className='text-danger'>{errors.name.message}</span>}

                      <div className='d-flex justify-content-end my-4'>
                        <Button className='main_dash_btn ' type='submit' disabled={loading}>Save {loading && <CircleLoader />}</Button>
                      </div>       
              </form>
            </Modal.Body>
              
              
          
      </Modal>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">creationDate</th>
              <th scope='col'>action</th>
            </tr>
          </thead>
          <tbody>
  {
    categoryList?.length  > 0 
    ? categoryList.map(category => (
        <tr key={category.id}>
          <th >{category.id}</th>
          <td>{category.name}</td>
          <td>{category.creationDate}</td>
           <td className=''>
            <DropDownButton
              actions={{
                view: {
                  label: "View",
                  icon: "fa-solid fa-eye",
                  onClick: () => handleView(category.id),
                },
                edit: {
                  label: "Edit",
                  icon: "fa-solid fa-pen",
                  onClick: () => handleShow(category.id),
                },
                delete: {
                  label: "Delete",
                  icon: "fa-solid fa-trash",
                  onClick: () => openDeleteModal(category.id),
                  class:"text-danger"
                },
              }}
            />
          </td>
        </tr>
      ))
    : ( <tr>
      <td colSpan="6" className="text-center">
       <NoData/> 
      </td>
    </tr>)
  }
</tbody>

        </table>
         <DeleteConfirmation
              show={showDeleteModal}
              deletedElement="category"
              onClose={closeDeleteModal}
              onConfirm={() => {
                deleteCategory(selectedId);
                closeDeleteModal();
          }}/>
       
      </div>

    </>
  )
}
