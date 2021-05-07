import React, { Fragment } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const errors = {
  'title': 'Please enter title',
  'body': 'Please enter body',
  'userId': 'Please select a user'
}

function FormControl(props) {
  const {name, value, required} = props
  const commonProps = {name, value, required}
  const optionsList = props.options?.map((option, index) =>
    <option value={option.id} key={index}>{option.name}</option>
  )

  const handleChange = (e) => {
    const {name, value, required} = e.target
    props.setData((prevState) => ({...prevState, [name]: value}))
    if (value.length > 0 && required) props.onValidate(name, '')  
  }

  const handleValidation = (e) => {
    const {name, value, required} = e.target
    if (!value && required) {
      props.onValidate(name, errors[name])
    }
  }

  return(
    <Fragment>
      <FormGroup className="mb-3">
        <Label className="mb-1">{props.label}</Label>
        {props.type === 'select'
          ?
            <>
              <Input type="select" {...commonProps} id="exampleSelect" onChange={handleChange} onBlur={handleValidation}>
                <option value=''>{`Please Select ${props.label}`}</option>
                {optionsList}
              </Input>
            </>
          :
            <>
              <Input type={props.type} {...commonProps} placeholder={`Please Enter ${props.label}`} onChange={handleChange} onBlur={handleValidation} />
            </>
        }
        {props.error &&
          <p className="text-danger">{props.error}</p>
        }
      </FormGroup>
    </Fragment>
  )
}

export default FormControl
