import React from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const BootstapFormField = ({label,name,touched,formValues,...rest}) => {
  return (
    <>
     <Form.Group as={Col} md="4"    >
          <Form.Label>{label}</Form.Label>
          <Form.Control
           name={name}
           value={formValues[name].value}
           {...rest}
           isValid={false}          />
          <Form.Control.Feedback>{formValues[name].errors?.[0]}</Form.Control.Feedback>
        </Form.Group>
    </>
  )
}

export default BootstapFormField