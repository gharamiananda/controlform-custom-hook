// import React from 'react'
// import CheckboxGroup from './CheckboxGroup'
import Checkbox from './Checkbox'
import Input from './Input'
// import RadioButtons from './RadioButtons'

// import Textarea from './Textarea'
// import SelectBox from './Select'
// import DatePicker from './DatePicker'

const InputControl =(props)=> {
    const { control, ...rest } = props
    console.log('propscontrol', props)
    switch (control) {
      case 'input':
        return <Input {...rest} />
    //   case 'textarea':
    //     return <Textarea {...rest} />
    //   case 'select':
    //     return <SelectBox {...rest} />
    //   case 'radio':
    //     return <RadioButtons {...rest} />
      case 'checkbox':
        return <Checkbox {...rest} />
    //   case 'date':
    //     return <DatePicker {...rest} />
      default:
        return <Input {...rest} />
    }
}

export default InputControl


