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

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    rollNumber: '',
    department: '',
    semester: '',
    batch: '',
    role: 'Student',
  })
  const handleInputChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      rollNumber: formData.rollNumber,
      classId:
        formData.batch + '_' + formData.department + '_' + formData.semester,
      role: 'Student',
    }
    axios
      .post(BASE_URL + '/auth/registerStudent', data, {
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
        <Col>
          <FloatingLabel controlId='rollNumber' label='Roll Number'>
            <Form.Control
              type='text'
              placeholder='Your roll number'
              name='rollNumber'
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <FloatingLabel controlId='department' label='Department'>
            <Form.Control
              type='text'
              placeholder='Your department'
              name='department'
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId='semester' label='Semester'>
            <Form.Control
              type='number'
              placeholder='Your semester'
              name='semester'
              value={formData.semester}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <FloatingLabel controlId='batch' label='Batch'>
            <Form.Select
              aria-label='Batch'
              name='batch'
              value={formData.batch}
              onChange={handleInputChange1}
              required
            >
              <option>Select batch</option>
              <option value='BTech'>BTech</option>
              <option value='MTech'>MTech</option>
              <option value='Phd'>Phd</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Button variant='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}
export default StudentRegister
