import React from 'react'
//import h1_img from "../../../assets/images/h1.png"

export default function Header({title,description,imgUrl}) {
  return (
    <>
      <div className='container-fluid header_bg'>
       <div className="row  px-2 text-white">
         <div className="col-md-8  d-flex flex-column justify-content-center ">
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div className="col-md-4  text-end">
            <img src={imgUrl} alt="" className='w-75' />
        </div>
       </div>

      </div>

    </>
  )
}
