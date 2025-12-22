import React from 'react'
import notFoundImg from "../../../assets/images/notFoundImg.png"

export default function NoData() {
  return (
    <>
      <div className='text-center'> 
         <img src={notFoundImg} alt="" />
         <h2>No Data !</h2>
         <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>

      </div>
    </>
  )
}
