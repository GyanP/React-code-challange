import React, { Fragment, useState } from 'react'
import { Alert, Button, Form } from 'reactstrap'
import { gql, useQuery, useMutation } from '@apollo/client'
import FormControl from './FormControl'

const initialData = {
  'title': '',
  'body': '',
  'userId': ''
}

const GET_USERS = gql`
  query users {
    users @rest(type: "User", path: "users/") {
      id
      name
    }
  }
`
const SAVE_DATA = gql`
  mutation posts($title: String!, $body: String!, $UserId: ID!) {
    posts publish(input: {title: $title, body: $body, userId: $userId})
    @rest(
      path: "posts/",
      method: "POST"
    ) {
      id
    }
  }
`

function UserForm() {
  const [processing, setProcessing] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()
  const [data, setData] = useState(initialData)
  const [error, setError] = useState(initialData)
  const {data: usersData} = useQuery(GET_USERS)
  const [saveData] = useMutation(SAVE_DATA)

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    const noError = Object.values(error).every(x => (x === null || x === ''));
    if (noError) {
      saveData({
        variables: { title: data.title, body: data.body, userId: data.userId }
      })
      .then((res) => {
        if (res.data.publish.id) setData(initialData)
        setMessage('Data saved!')
        setVisible(true)
        setProcessing(false)
      })
      .catch((e) => {
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
          options={usersData?.users}
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
