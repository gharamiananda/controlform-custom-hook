import React, { useState } from 'react'
import FormField from './FormField'
import { maximumLengthValidation, minimumLengthValidation, requireValidation } from './validation'
import CustomButton from './CustomButton'
import {GloabalFormComponent} from '../hooks/GloabalFormComponent';
import { Button, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import InputGroup from 'react-bootstrap/InputGroup';
import BootstapFormField from './bootstap/BootstapFormField';

const AddForm = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };

 const customValidation = fieldName => {
    return  (value,values)=>{
        console.log(values?.[fieldName],"gg kk")
        return  (values?.[fieldName]?.value?.toString() =="true" ) && {isValid: false,message:`Must be atleast ${fieldName}  characters`}}
  }

    const initialfields={
        fName:{value:"",validations:[requireValidation,customValidation('isActive'),minimumLengthValidation(5),maximumLengthValidation(10)],errors:null},
        lLame:{value:"",validations:[requireValidation,minimumLengthValidation(7)],errors:null} ,
        password:{value:"",validations:[requireValidation,minimumLengthValidation(7)],errors:null} ,
        
        isActive:{value:false} ,

    
      }


  
   
  return (
    <Container className='mt-5'>
     <GloabalFormComponent initialValues={initialfields}  >
      {(props) => (
        <>
        <div className="">


        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        {/* <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group> */}
        <BootstapFormField name='fName' {...props}  required  placeholder="First name" />
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button onClick={props.handleSubmit}>Submit form</Button>
    </Form>

            {console.log(props.formValues,"sdjgdh")}
         
        <FormField name='fName' {...props} />
    <FormField name='lLame'  {...props}  />
    <FormField name='password' type='password'  {...props}   />
    <FormField name='isActive' type='checkbox'  {...props}   />


           <button onClick={props.handleSubmit} >jkbhihh opo</button>
        </div>
     

    </>
  )}

         
        </GloabalFormComponent>
    </Container>
  )
}

export default AddForm



