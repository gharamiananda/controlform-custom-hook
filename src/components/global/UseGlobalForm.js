import React, { useEffect, useRef, useState } from 'react'

 export const useGlobalForm = ({initialValue,userValidationSchema,formSubmit}) => {
  const[touched,setTouched]=useState({});
  const[values,setValues]=useState(initialValue)


  const[errors,setErrors]=useState({})

  const[isSubmiting,setIsSubmiting]=useState(false)


  
useEffect(()=>{
  const allErros=setValidationErrors()
  setErrors(allErros)
  if(Object.values(allErros)?.filter(err=>err?.length && err?.length > 0 )?.length===0){
    setIsSubmiting(true)
   
  }

},[values])

const handleChange = (event) => {
  const { name, value, type, checked } = event.target;
  const nameParts = name.split('.');

  // Set touched for the top-level field and its nested fields
  setTouched(prev => ({ ...prev, [nameParts[0]]: true }));

  // Update only the modified part of the nested structure
  const updatedValue = type === 'checkbox' ? checked : value?.trimStart();

  
  // updatedSkills[index][field] = value;

  const match = name.match(/\[(\d+)\]/);
  const indexNumber = match ? parseInt(match[1]) : null;
console.log('match', match)
if(match?.length){
  // setValues(newValues);
  const nameKey= name.substring(0, name.indexOf('['))
  const updatedValues = [...values[nameKey]];
  // console.log('fielcustomIndexd',nameKey)
  const textAfterIndex = name.substring(name.indexOf('[') + 4);
  
  updatedValues[indexNumber][textAfterIndex] = updatedValue;
  console.log('nameKey', updatedValues[indexNumber],textAfterIndex,nameKey)
  setValues({...values,[nameKey]:updatedValues});

}else{
// Extract the nested object structure from the input name



  // Create a copy of the current state and its nested structures
  const newValues = { ...values };

  // Traverse the nested structure and update the modified part
  let nestedObject = newValues;
  for (const key of nameParts) {
    nestedObject[key] = { ...nestedObject[key] };
    if (key === nameParts[nameParts.length - 1]) {
      nestedObject[key] = updatedValue;
    }
    nestedObject = nestedObject[key];
  }

  // Update the state with the modified nested structure
  setValues(newValues);
}

  
};


console.log('vasetValueslues', values)
const handleSubmit=(e)=>{
  e.preventDefault()
  setTouched(flattenKeys(values).reduce((result, item) => {
    result[item] = true;
    return result;
  }, {}))
  const allErros=setValidationErrors()
  setErrors(allErros)

  
  if(Object.values(allErros)?.filter(err=>err?.length && err?.length > 0 )?.length===0){
    setIsSubmiting(true)
    formSubmit(values,{touched,setTouched,setValues,errors,setErrors})
   
  }


}




const onBlur = (event) => {

  setErrors(setValidationErrors())  
      setTouched((prevTouched) => ({
        ...prevTouched,
        [event.target.name]: true,
      }));
    };


    

    function flattenKeys(obj, prefix = "") {
      return Object.keys(obj).flatMap(key => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (Array.isArray(obj[key])) {
          const arrayKeys = obj[key].map((item, index) => {
            const itemKey = `${newKey}[${index}]`;
            if (typeof item === "object" && item !== null) {
              return [itemKey].concat(flattenKeys(item, itemKey));
            }
            return itemKey;
          });
          return arrayKeys.flat();
        }
        if (typeof obj[key] === "object" && obj[key] !== null) {
          return flattenKeys(obj[key], newKey);
        }
        return newKey;
      });
    }
    

    

const setValidationErrors=()=>{
  let allErrors ={}
 flattenKeys(values).forEach(field=>{

  allErrors[field]=errorsForField(field)
});

return allErrors
}

function getNestedArrayValue(arr, path) {
  const keys = path.split('.');
  
  return arr.map(obj => {
    let currentObj = obj;
    for (const key of keys) {
      if (currentObj[key] === undefined) {
        return undefined; // Handle case where the path doesn't exist
      }
      currentObj = currentObj[key];
    }
    return currentObj;
  });
}

function getObjectValue(obj, path) {
  const keys = path.split('.');
  let currentObj = obj;

  for (const key of keys) {
    if (currentObj[key] === undefined) {
      return undefined; // Handle case where the path doesn't exist
    }
    currentObj = currentObj[key];
  }

  return currentObj;
}


const errorsForField=(field)=>{

  let renameField=field

  
  if(field.includes('[')){
    renameField=field.replace(/\[\d+\]/, `.customIndex`)
  }
  return userValidationSchema[renameField]?.map(validation=>{
 

    
    if(field.includes('[')){
      const nameKey= field.substring(0, field.indexOf('['))
      // console.log('fielcustomIndexd',nameKey)
      const textAfterIndex = field.substring(field.indexOf('[') + 4);
      console.log('field.subst', field.substring(field.indexOf('[') + 0))
   const arrayValues = getNestedArrayValue(values[nameKey], textAfterIndex);

   const match = field.match(/\[(\d+)\]/);
   const indexNumber = match ? parseInt(match[1]) : null;

   const {isValid,message}=validation(arrayValues[indexNumber],values) ||{};
   return isValid ? "" :message
  }



const value = getObjectValue(values, renameField);
  const {isValid,message}=validation(value,values) ||{};
    return isValid ? "" :message
}).filter(val=>{
  return val?.length > 0})
}






  return {handleChange,handleSubmit,touched,setTouched,onBlur,values,setValues,errors,setErrors,isSubmiting,initialValue}
}








 const ParentControl = ({ initialValue,userValidationSchema,formSubmit,children }) => {
   return <>
  {children({...useGlobalForm({ initialValue,userValidationSchema,formSubmit})})}
  </>
} ;

export default ParentControl




export const FieldArrayControl = ({children,...restFieldsData }) => {
const {setValues,values,keyName,initialValue}=restFieldsData

const updatedY = {};

for (const key in values?.[keyName]?.[0]) {
  updatedY[key] = '';
}


  const handleAddFields = () => {
  
    setValues(prev=>({...prev,[keyName]:[...prev[keyName], updatedY ]}));
  };
  
  const handleRemoveFields = (index) => {
    const inputFields = [...values[keyName]];
    inputFields.splice(index, 1);  
    setValues(prev=>({...prev,[keyName]:inputFields}));
    
  };


  console.log('crestFieldsDatahildren', restFieldsData)
  return <>
  {children({...restFieldsData,handleAddFields,handleRemoveFields})}
  </>
} ;

 

