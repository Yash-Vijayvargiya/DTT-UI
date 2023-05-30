import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap'
import Select, { ActionMeta, MultiValue } from 'react-select'

import { Constants } from '../../constants'

type FormDataType = {
  name: string
  code: string
  dept: string
  grp: string
  professor: Professor
}

const initialFormData: FormDataType = {
  name: '',
  code: '',
  dept: '',
  professor: { label: '1', value: '1', name: '1', emailId: '' },
  grp: 'All',
}

const CourseForm = () => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData)
  const [professors, setProfessors] = useState<Professor[]>()
  const [selectedProfessor, setSelectedProfessor] = useState<Professor>()

  useEffect(() => {
    axios.get(Constants.BASE_URL + '/admin/professors').then((response) => {
      const prof: Professor[] = []
      response.data.map((d: Professor) => {
        prof.push({
          label: d.emailId,
          value: d.name + '-' + d.emailId,
          name: d.name,
          emailId: d.emailId,
        })
      })
      setProfessors(prof)
    })
  }, [])
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {}
  const handleSelectChange = (selected: any) => {
    setSelectedProfessor(selected)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className='mb-3'>
        <Col>
          <FloatingLabel label='Course Name'>
            <Form.Control
              type='text'
              placeholder='Enter course name'
              name='name'
              value={formData.name}
              onChange={handleFormChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label='Course Code'>
            <Form.Control
              type='text'
              placeholder='Enter course code'
              name='code'
              value={formData.code}
              onChange={handleFormChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <FloatingLabel label='Department'>
            <Form.Control
              type='text'
              placeholder='Enter department'
              name='dept'
              value={formData.dept}
              onChange={handleFormChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label='Group'>
            <Form.Control
              type='text'
              placeholder='Enter Group'
              name='grp'
              value={formData.grp}
              onChange={handleFormChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Form.Group>
            <Form.Label>Professor</Form.Label>
            <Select
              options={professors}
              isSearchable
              placeholder='Select Professor'
              onChange={handleSelectChange}
              value={selectedProfessor}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default CourseForm
