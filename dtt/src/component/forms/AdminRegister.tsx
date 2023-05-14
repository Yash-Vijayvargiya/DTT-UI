import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  FormControl,
} from 'react-bootstrap'
import axios from 'axios'
// import { FormControlElement } from 'types'
const BASE_URL = 'http://localhost:8080/api/v1'

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Admin',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      userName: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'Admin',
    }
    axios
      .post(BASE_URL + '/auth/registerAdmin', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  return (
    <>
      <Form className='mt-3'>
        <Row className='mb-3'>
          <Col>
            <FloatingLabel controlId='email' label='Email address'>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId='password' label='Password'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <FloatingLabel controlId='name' label='Name'>
              <Form.Control
                type='text'
                placeholder='Your name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col></Col>
        </Row>
        <Button variant='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default AdminRegister
