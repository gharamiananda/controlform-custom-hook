

const numberPattern = /^\d+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const requireValidation = (value) => {
  return {isValid:!!value ,message:'Field is required'}
}


export const minimumLengthValidation = minimum => {
    return  value=>{ return  value?.length > 0 && {isValid: value?.length >= minimum ,message:`Must be atleast ${minimum}  characters`}}
  }
  
  
export const maximumLengthValidation = maximum => {
    return  value=>{
      return  {isValid: value?.length < maximum ,message:`Must be maximum ${maximum}  characters`}}
  }
  
  export const numberValidation = (value) => {
    return  value?.length  &&  {isValid: numberPattern.test(value) ,message:'Enter a valid number'}
  }
  
  export const emailValidation = (value) => {
    return  value?.length  &&  {isValid: emailPattern.test(value) ,message:'Enter a valid Email'}
  }
  