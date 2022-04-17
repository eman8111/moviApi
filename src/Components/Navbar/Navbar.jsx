import React from 'react';
import "./Navbar.module.css";
import style from "./Navbar.module.css";
import { Link } from 'react-router-dom';

export default function Navbar({loginData, logOut}) {
  
  return (
    <>
  <nav className={`${style.navbar} navbar navbar-expand-md`}>
  <div className="container-fluid">
    <Link className={`navbar-brand fs-3 text-white`} to="home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
        <i className="fa-solid fa-bars-staggered text-white"></i>
      </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      {loginData ?<ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className={`${style.linkColor} nav-link active`} aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`${style.linkColor} nav-link`} to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className={`${style.linkColor} nav-link`} to="tvshowes">Tv showes</Link>
        </li>
        <li className="nav-item">
          <Link className={`${style.linkColor} nav-link`} to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className={`${style.linkColor} nav-link`} to="about">About</Link>
        </li>
      </ul> : ""}
      <ul className="navbar-nav ms-auto d-flex align-items-center">
        <div className='myIcon d-flex align-items-center me-5 my-3'>
        {loginData ? <h5 className='text-capitalize fw-bold me-4'>{loginData.first_name + " " + loginData.last_name}</h5> : ""}
          <i className={`fa-brands fa-facebook text-white fa-xl ${style.pointer}`}></i>
          <i className={`fa-brands fa-instagram text-white mx-4 fa-xl ${style.pointer}`}></i>
          <i className={`fa-brands fa-youtube text-white fa-xl ${style.pointer}`}></i>
        </div>
        {!loginData ? <>
          <li className="nav-item">
          <Link className={`${style.linkColor} nav-link`} to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className={`${style.linkColor} nav-link`} to="register">Register</Link>
        </li>
        </> : <li className="nav-item">
          <a className={`${style.linkColor} nav-link `} onClick={logOut}>Logout</a>
        </li>}
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
