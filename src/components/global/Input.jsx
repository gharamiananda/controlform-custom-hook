
import React from 'react'

function Input (props) {

  const { touched,label,handleChange,errors
,name,...rest } = props||{};


  return (

    <>
      <label htmlFor={name}>{label||name}</label>
 

    <input    name={name} onChange={handleChange} className='form-control my-2' {...rest}  /> 

{touched?.[name] && errors?.[name] && <p className="text-danger">{  errors?.[name]}</p>}

  </>
  
  )
}

export default Input