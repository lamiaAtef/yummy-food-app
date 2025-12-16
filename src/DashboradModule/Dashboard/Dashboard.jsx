import React from 'react'
import Header from '../../SharedComponents/components/Header/Header'
import headerImg from "../../assets/images/h1.png"
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  let navigate = useNavigate()
  return (
    <>
    <Header title={"Welcome Upskilling"} description={"This is a welcoming screen for the entry of the application , you can now see the options"} imgUrl={headerImg}/>
    <div className="home p-4 m-3 d-flex justify-content-between align-items-center">
      <div className="caption">
        <h4>Fill the <span className='main_color fw-bold' >Recipes</span> ! </h4>
        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <button onClick={()=>{navigate("/dashboard/recipes")}} className='btn auth_btn bg-main-color '>Fill Recipes <i className="fa fa-arrow-right ms-3" aria-hidden="true"></i></button>
    </div>
    </>
  )
}
