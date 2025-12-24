import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UploadBox from '../../../SharedComponents/components/UploadBox/UploadBox';
import { useForm } from 'react-hook-form';
import { CategoryContext } from '../../../context/CategoryContext';
import { RecipesContext } from '../../../context/RecipesContext';

export default function RecipeData() {
  const recipeImageRef = useRef(null);
  const {id} = useParams()
  const navigate = useNavigate()
  
  const {getTags, tags, addRecipe, getRecipeById, updateRecipe,error} = useContext(RecipesContext)
  const {getCategory, categoryList} = useContext(CategoryContext)
  
  const {register, handleSubmit, formState:{errors}, reset} = useForm()
  
  const [previewImage, setPreviewImage] = useState(null)

  // Load all data sequentially
  useEffect(() => {
    const fetchAllData = async () => {
      await getCategory()
      await getTags()
      
      let recipe = null
      
      if (id) {
        console.log(id,"id")
        recipe = await getRecipeById(id)
        console.log(recipe)
      }
      
      // Bind values after options loaded
      reset({
        name: recipe?.name || "",
        price: recipe?.price || "",
        description: recipe?.description || "",
        tagId: recipe?.tag?.id ? recipe.tag.id : "",
        categoriesIds: recipe?.category[0]?.id ? String(recipe?.category[0]?.id) : "",


      })
      console.log("recipe?.imagePath",recipe?.imagePath)
      if (recipe?.imagePath) {
        console.log("sora1")
        setPreviewImage(`https://upskilling-egypt.com:3006/${recipe.imagePath}`)
       
      }
    }

    fetchAllData()
    
   
  }, [id, reset])

  // register recipeImage
  useEffect(() => {
    register("recipeImage")
  }, [register])

  const appendToFormData = (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("tagId", data.tagId)
    formData.append("description", data.description)
    
 
    if (recipeImageRef.current) {
    formData.append("recipeImage", recipeImageRef.current);
    console.log("new image uploaded");
  }
   
        formData.append("recipeImage", previewImage);
        console.log("no image hhh",previewImage)
       formData.append("categoriesIds", data.categoriesIds)
    
    return formData
  }
      

   

  const onSubmit = (data) => {
    const recipeData = appendToFormData(data)
    console.log(recipeData)
    
    try {
      if (!id) {
        addRecipe(recipeData)
      } else {
        updateRecipe(id, recipeData)
      }
      navigate("/dashboard/recipes")
    } catch (error) {
      console.log(error)
    }

   
  }
  
  return (
    <>
      <div className='bg_header d-flex justify-content-between align-items-center my-2 px-5'>
        <div className="text">
          <h4>{id ? "Update" : "Fill"} the <span className='main_color'>Recipes</span>!</h4>
          <p>You can now fill the meals easily using the table and form!</p>
        </div>
        <button className='main_dash_btn' onClick={()=>navigate("/dashboard/recipes")}>
          All Recipes <i className="fa-solid fa-arrow-right ms-3"></i>
        </button>
      </div>
      
      <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <input {...register("name",{required:"name is required"})} placeholder='Recipe Name' type="text" className="form-control my-2"/>
        {errors.name && <span className='text-danger'>{errors.name.message}</span>}

        {/* Tag */}
        <select {...register("tagId",{required:"tagId is required"})} className="form-control my-2">
          <option value="">Select Tag</option>
          {tags?.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        {errors.tagId && <span className='text-danger'>{errors.tagId.message}</span>}

        {/* Price */}
        <div className="input-group mb-3 border-0">
          <input placeholder='price' {...register("price",{required:"price is required"})} type="number" className="form-control my-2 no-spinner no-arrows"/>
          <div className="d-flex align-items-center border-0">
            <span className="input-group-text">EGP</span>
          </div>
        </div>
        {errors.price && <span className='text-danger'>{errors.price.message}</span>}

        {/* Category (single select) */}
        <select {...register("categoriesIds")} className="form-control my-2">
          <option value="">Choose Category</option>
          {categoryList?.map(cat => (
            <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
          ))}
        </select>

        {/* Description */}
        <textarea placeholder='description' {...register("description",{required:"description is required"})} className="form-control my-2"/>
        {errors.description && <span className='text-danger'>{errors.description.message}</span>}

        {/* Upload */}
        <UploadBox fileRef={recipeImageRef}  existingImagePath={previewImage}/>
        
        {/* {previewImage && <img src={`https://upskilling-egypt.com:3006/${previewImage}`} alt="preview" className="img-thumbnail mt-2" style={{maxWidth:"200px"}}/>} */}

        {/* Buttons */}
        <div className='d-flex justify-content-end m-2'>
          <button className='cancel_btn' type='button'>Cancel</button>
          <button className='main_dash_btn'>Save</button>
        </div>
      </form>
    </>
  )
}
