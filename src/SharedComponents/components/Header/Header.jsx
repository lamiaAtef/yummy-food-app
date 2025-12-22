import React from 'react'
//import h1_img from "../../../assets/images/h1.png"

export default function Header({title,description,imgUrl}) {
  return (
    <>
      <div className='container-fluid header_bg'>
       <svg
  className="headerSvg"
  viewBox="0 0 810 208"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M506.5 12.5C556.701 12.5 597.5 53.4091 597.5 104C597.5 154.591 556.701 195.5 506.5 195.5C456.299 195.5 415.5 154.591 415.5 104C415.5 53.4091 456.299 12.5 506.5 12.5Z"
    stroke="white"
    strokeOpacity="0.05"
    strokeWidth="25"
  />

  <path
    d="M30 106C43.3503 106 54 116.616 54 129.5C54 142.384 43.3503 153 30 153C16.6497 153 6 142.384 6 129.5C6 116.616 16.6497 106 30 106Z"
    stroke="#54B435"
    strokeOpacity="0.5"
    strokeWidth="12"
  />

  <circle
    cx="788.5"
    cy="110.5"
    r="15.5"
    stroke="#54B435"
    strokeOpacity="0.5"
    strokeWidth="12"
  />
</svg>


       <div className="row  px-2 text-white content">
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
