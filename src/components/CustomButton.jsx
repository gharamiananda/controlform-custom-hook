import React from 'react'

const CustomButton = ({title,submitHandler,...rest}) => {
    console.log(rest,"rest button")
  return (
    <>          <button onClick={submitHandler} >{title }</button>
    </>
  )
}

export default CustomButton