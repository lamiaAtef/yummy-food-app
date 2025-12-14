import React from 'react'

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         <li className="nav-item">
          {/*  TODO AVATAR */}
          {/* <img src="" alt="" /> */}
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Upskilling</a>
        </li>    
      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}
