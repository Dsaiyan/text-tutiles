import React from 'react'

export default function About(props) {
  return (
    <div className="AboutUs" style={ 
        {backgroundColor : props.mode==="light"?"white":"#143548",
            color : props.mode==="light"?"black":"white" } } >
        <div className="card-header">
            Featured
        </div>
        <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            {/* <link href="/" className="btn btn-primary">Go somewhere</link> */}
        </div>
    </div> 
  )
}
