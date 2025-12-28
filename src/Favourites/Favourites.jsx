import React, { useEffect, useState } from 'react'
import { FAVS_URL, imageURL } from '../api/apiURLs'
import axiosClient from '../api/axiosClient';
import notFoundImg from "../../src/assets/images/notFoundData.png"
import { toast } from 'react-toastify';
import NotFound from '../SharedComponents/components/NotFound/NotFound';
import NoData from '../SharedComponents/components/NoData/NoData';
import DeleteConfirmation from '../SharedComponents/components/DeleteConfirmation/DeleteConfirmation';
import { BeatLoader } from 'react-spinners';

export default function Favourites() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
    let [loading,setLoading] = useState(true)


  const openDeleteModal = (id,name) => {
    setSelectedId(id);

   setSelectedName(name);
  setShowDeleteModal(true);
};


const closeDeleteModal = () => {
  setSelectedId(null);
  setShowDeleteModal(false);
};


  let [allFav,setAllFav] = useState([])
  let getAllFav = async() => {
    setLoading(true)
    try {
       let response = await axiosClient.get(FAVS_URL.GET_FAVS );
         setAllFav(response.data.data)
      }
      
     catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  
  let remove_fav = async(id) =>{

    
    try {
        let response = await axiosClient.delete(FAVS_URL.DELETE_FAV(id))
       
        getAllFav()
         toast.success("recipe is deleted successfully")

    } catch (error) {
      console.log(error)
      toast.error("sorry.. recipe can't be deleted")
    }  
    

  }
   useEffect(()=>{
    getAllFav()

   },[])
  if (loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 
   
  return (
    <>
       <div  className='container'>
          <div className="row">
             {allFav.length > 0 ?
                  allFav?.map(fav => 
                  <div className="col-md-4 ">
              
                  <div className="item m-3 dropDownMenu text-center p-3 position-relative" key={fav.id}  >
                    {fav.recipe.imagePath ? (
                      <img src={`${imageURL}/${fav.recipe.imagePath}`} alt="" className='w-100 my-2' />
                    )
                    :
                      <img src={notFoundImg} alt="" className='w-100 my-2' />
                  
                  }
                  <h4 className='my-2'>{fav.recipe.name}</h4>
                  <p>{fav.recipe.description}</p>
                  <p>{fav.recipe.tag.name}</p>
                   <button className='position-absolute  remove_fav' onClick={()=>openDeleteModal(fav.id,fav.recipe.name)}>
                      <i className='fa-solid fa-heart text-success list_item'></i>
                    </button>
                  </div>
              
            </div>
              )
              :
              <NoData/>
            }
          </div>

      </div>
        <DeleteConfirmation
                        show={showDeleteModal}
                        deletedElement="recipe"
                        itemName={selectedName}
                        onClose={closeDeleteModal}
                        onConfirm={() => {
                        remove_fav(selectedId);
                        closeDeleteModal();
                      }}
            />
     
    </>
  )
}
