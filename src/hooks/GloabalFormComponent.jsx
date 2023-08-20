import React, { Children, useEffect, useRef, useState } from 'react';
import useForm from './useForm'
export const GloabalFormComponent = ({ initialValues,customValidation,children }) => {
  const propsddd=useForm(initialValues)

console.log('propsddd', propsddd)
 
  
  return <>
  {children({...propsddd,customValidation})}
  
  </>
} ;





