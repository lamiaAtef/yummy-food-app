import React from 'react'
import noDataImg from "../../../assets/images/notFoundImg.png"

export default function NotFound() {
  return (
    <>
      <div className='text-center' >
        <img src={noDataImg} alt="" className='h-50' />
        <h3>No Data !</h3>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
    </>
  )
}
