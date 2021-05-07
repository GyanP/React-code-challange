import React, { Fragment, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'reactstrap'
import FormControl from './FormControl'
const initialData = {
  'title': '',
  'body': '',
  'userId': ''
}

function UserForm() {
  const [processing, setProcessing] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(initialData)

  useEffect(() =>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(
      (result) => {
        setUsers(result)
      },
      (error) => {
        setMessage('There is some issue while getting users list, please try again in a while!')
        setVisible(true)
      }
    )
  }, [])

  const handleSubmit = (e) =>{
    e.preventDefault()
    setProcessing(true)
    const noError = Object.values(error).every(x => (x === null || x === ''));
    if (noError) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
      fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.id) setData(initialData)
        setMessage('Data saved!')
        setVisible(true)
        setProcessing(false)
      },(error) => {
        setMessage('There is some issue while saving data, please try again in a while!')
        setVisible(true)
        setProcessing(false)
      })
    }
  }

  const validate = (field, msg) => {
    setError((prevState) => ({...prevState, [field]: msg}))
  }

  return (
    <Fragment>
      <Alert color="info" isOpen={visible} onClick={() => setVisible(false)}>
        {message}
      </Alert>
      <Form onSubmit={handleSubmit}>
        <FormControl
          key='title'
          type='text'
          label='Title'
          name='title'
          value={data.title}
          setData={setData}
          onValidate={validate}
          error={error.title} 
          required
        />
        <FormControl
          key='body'
          type='text'
          label='Body'
          name='body'
          value={data.body}
          setData={setData}
          onValidate={validate}
          error={error.body}
          required
        />
        <FormControl
          key='userId'
          type='select'
          label='User'
          name='userId'
          options={users}
          value={data.userId}
          setData={setData}
          onValidate={validate}
          error={error.userId}
          required
        />
        <Button disabled={processing ? true : false}>{processing ? 'Saving..': 'Save'}</Button>
      </Form>
    </Fragment>
  );
}

export default UserForm
