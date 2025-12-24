import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import hero from "../../../assets/images/hero.png"
import {  useLocation } from 'react-router-dom';
import { CategoryContext } from '../../../context/CategoryContext';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { UsersContext } from '../../../context/UsersContext';
import { RecipesContext } from '../../../context/RecipesContext';

export default function NavBar() {
  let [currentPage ,setCurrentPage] = useState();
  let location = useLocation()

  const{loginData} = useContext(AuthContext)
  const{searchCategory} = useContext(CategoryContext)
  const{searchUsers} =  useContext(UsersContext)
  const{searchRecipes} =  useContext(RecipesContext)


  const handleSearch = (searchText) => {
        if (currentPage === "/dashboard/recipes") return searchRecipes(searchText);
        else if (currentPage === "/dashboard/categories") searchCategory(searchText);
        else if (currentPage === "/dashboard/users") searchUsers(searchText);
  };
  useEffect(()=>{
    setCurrentPage(location.pathname)
    console.log(location.pathname)
  },[location])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid d-flex align-items-center">
   
    <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
   
    {(currentPage== "/dashboard/recipes" || currentPage =="/dashboard/categories" || currentPage =="/dashboard/users") &&
       <InputGroup className="mb-3  searchStyle">
        <InputGroup.Text id="basic-addon1" style={{background:"#fff"}} className=''>
        <i className="fa-solid fa-magnifying-glass"></i>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            // width:"50%"
             }}
          onChange={(e)=>handleSearch(e.target.value)}
        />
      </InputGroup>



      
    //  <InputGroup className="mb-3 w-50">
    //     <Form.Control
    //       placeholder="Search"
    //       aria-label="Recipient's username"
    //       aria-describedby="basic-addon2"
    //        style={{
    //             border: "none",
    //             outline: "none",
    //             boxShadow: "none"
    //           }}
    //       onChange={(e)=>handleSearch(e.target.value)}
    //     />
    //     <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
    //   </InputGroup>
    //  <input type="text" style={{border:0 }}  onChange={(e)=>handleSearch(e.target.value)}/>
    }
     
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         <li className="nav-item">
          {/*  TODO AVATAR */}
          {/* <img src="" alt="" /> */}
        </li>

        <li className="nav-item">

          <a className="nav-link active" aria-current="page" href="#">
            <img src={hero} alt="" />
            {loginData?.userEmail}
            </a>
        </li>    
      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}
