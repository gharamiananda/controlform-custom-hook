
import React from 'react'

function Checkbox (props) {

  const { label,handleChange, name,error,...rest } = props;


 console.log('resddddddt', rest)

  return (

    <>
      <label htmlFor={name}>{label||name}</label>
 

    <input  type='checkbox'  name={name} onChange={handleChange}  {...rest}  /> 



  </>
  
  )
}

export default Checkbox