import { Container } from 'react-bootstrap'
import { emailValidation, maximumLengthValidation, minimumLengthValidation, numberValidation, requireValidation } from '../validation';
import InputControl from './InputControl';
import ParentControl, { FieldArrayControl } from './UseGlobalForm';



const userValidationSchema={
  fName:[requireValidation,minimumLengthValidation(5)],
  lLame:[requireValidation,minimumLengthValidation(7)] ,
  password:[requireValidation,minimumLengthValidation(7),maximumLengthValidation(10)],
  mobile:[numberValidation],
  email:[emailValidation],
  'address.pin':[requireValidation,numberValidation] ,
  'address.contact.cl':[requireValidation,numberValidation] ,
  'skills.customIndex.percentage':[requireValidation,numberValidation] ,


}


const UserLogin = () => {
 const initialValue={
  fName:"" ,
  lLame:"",
  password:"",
  mobile:"",
  isActive:false,
  address:{
    city:"",
    pin:"",
    contact:{
      cl:""
    }
  },
  skills:[{name:"",percentage:""}]
 }  

 const formSubmit=(values,allProps)=>{
  console.log('values,allProps', values,allProps)
 }


  return (
    <Container className='mt-4'>

      <ParentControl initialValue={initialValue} userValidationSchema={userValidationSchema} formSubmit={formSubmit} >
      {(props) => {
      const  {values,handleSubmit}=props
     return   <>
      {console.log('phandleSubmitrops', props)}

<InputControl {...props}   value={values.fName} required name='fName'   placeholder='Enter fName name'  />
      
      <InputControl {...props}   value={values.lLame}  required name='lLame'     placeholder='Enter lLame name'  />
      <InputControl {...props}   value={values.email}  required name='email'     placeholder='Enter email'  />

      <InputControl  {...props}   value={values.password}  required type='password'     name='password'  placeholder='Enter password name'   />
      <InputControl  {...props} control='checkbox'  type="checkbox"  checked={values.isActive} value={values.password}  required      name='isActive'  />

      
      <InputControl  {...props}   value={values.mobile}  required    name='mobile'  placeholder='Enter mobile nmber'   />
      
      <InputControl  {...props}   value={values.address.city}  required    name='address.city'  placeholder='Enter city name'   />
      <InputControl  {...props}   value={values.address.pin}  required    name='address.pin'  placeholder='Enter pin nmber'   />
      <InputControl  {...props}   value={values.address.contact.cl}  required    name='address.contact.cl'  placeholder='Enter address contact.cl nmber'   />

    

           <div className="">

           <FieldArrayControl  keyName='skills' {...props}>
           {({handleAddFields
,handleRemoveFields
,...propsssss}) => {
  const  {values,handleSubmit}=props
  {console.log('propsssss', propsssss)}
  return <>
      <button className='btn btn-info mt-2 me-2' onClick={handleAddFields}>Add more</button>
      {
      
       values.skills.map((skill,index)=>
      <div className='row align-items-center ' key={`skills[${index}].name`} >
        <div className="col-md-5 ">
        <InputControl  {...props}   value={values.skills[index].name}  required    name={`skills[${index}].name`}  placeholder='Enter skills [index].percentage nmber'   />
         
         
        </div>
        <div className="col-md-5">
       
          <InputControl  {...props}   value={values.skills[index].percentage}  required   name={`skills[${index}].percentage`}    placeholder='Enter skills [index].percentage nmber'   />
         
        </div>
        <div className="col-md-2">
             <button className='btn btn-danger  mt-2' onClick={()=>handleRemoveFields(index)}>Remove</button>
        </div>
    
         </div>
      )}
    </>
       
           }}
         
            </FieldArrayControl>

           </div>
      <div className="">
      
            <button className='btn btn-success mt-3' onClick={handleSubmit}>Submit</button>
      </div>

        </>}}
      </ParentControl>

    </Container>
  )
}

export default UserLogin

