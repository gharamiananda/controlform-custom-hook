import React, { useState } from 'react'

const useForm = (fields,onSubmit) => {



const[formValues,setFormValues]=useState(fields);
const[touched,setTouched]=useState({});
const[values,setValues]=useState({})
const[errors,setErrors]=useState({})


const onChange=(event)=>{
   const  {name,value,type,checked}=event.target;

   setTouched(prev=>({...prev,name:true}))
   let newField={...formValues}
   setValues(prev=>({...prev,[name]: type=='checkbox' ? checked  : value}))
   newField[name].value= type=='checkbox' ? checked  : value
newField = setValidationErrors(newField)
   setFormValues(newField)
}

const setValidationErrors=(fields)=>{
Object.keys(fields).forEach(field=>{
  fields[field].errors=errorsForField(field)
  setErrors(prev=>({...prev,[field]:errorsForField(field)}))
});
return fields
}


const errorsForField=(field)=>{
  
  return fields[field]?.validations?.map(validation=>{
    const {isValid,message}=validation(fields[field].value,fields);
    
    return isValid ? "" :message
}).filter(value=>value?.length > 0)
}

const handleSubmit=(e)=>{
  setTouched(Object.keys(formValues).reduce((result, item) => {
    result[item] = true;
    return result;
  }, {}))
const allErrors = setValidationErrors(formValues)
// onSubmit(formValues)
}


const onBlur = (event) => {
const allErrors = setValidationErrors(formValues)

    setTouched((prevTouched) => ({
      ...prevTouched,
      [event.target.name]: true,
    }));
  };

  return {onChange,formValues,setFormValues,handleSubmit,touched,setTouched,onBlur,values,setValues,errors,setErrors}
}

export default useForm