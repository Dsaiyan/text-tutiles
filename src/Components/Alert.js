import React from 'react'

export default function Alert(props) {
    const capitalize=(text)=>{
        let lower = text.toLowerCase()
        return lower.charAt(0).toUpperCase()+lower.slice(1)
    }
  return (
    <div style = {{height:"50px"}}>
      <div>        
        {
          props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{ capitalize(props.alert.type)}</strong> : {props.alert.msg}
          </div>
        }        
      </div>
    </div>
      
  )
}
