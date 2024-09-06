import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


export default function NavBar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode}  bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{props.title}</Link>
            <button
              className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"> 
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/about">About</Link>
                </li>
              </ul>

              {/* Enable Dark Mode */}
              <div
                className={`form-check form-switch text-${props.mode === "light" ? "dark" : "light"} mx-2 form-check-reverse`}>
                <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Enable Dark Mode</label>
              </div>
              {/* Search Button */}
              <form className="d-flex" role="search">
                <input className="form-control me-2" btype="search" 
                style={{backgroundColor:props.mode==="light"?"white":"rgb(92 195 254)",
                  color : props.mode==="light"?"#143548":"white" } }
                placeholder="Search" aria-label="Search"/>
                <button className="btn btn-primary" type="submit">Search</button>
              </form>
          </div>
        </div>
      </nav>
  </div>
  );
}
NavBar.propTypes = {
  title : PropTypes.string.isRequired ,
  aboutText : PropTypes.string
}
// Navbar.defaultProps={
//   title : "Set Title Here",
//   aboutText : "Set About Text Here "
// }