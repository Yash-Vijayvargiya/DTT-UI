import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import Select, { ActionMeta, MultiValue } from 'react-select'

import { Constants } from '../../constants'

type FormDataType = {
  name: string
  code: string
  dept: string
  professorEmail: string
}

const initialFormData: FormDataType = {
  name: '',
  code: '',
  dept: '',
  professorEmail: '',
}

const CourseForm = () => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData)
  const [professors, setProfessors] = useState<Course[]>()

  useEffect(() => {
    axios.get(Constants.BASE_URL + '/admin/professors').then((response) => {
      const prof: Course[] = []
      response.data.map((d: Professor) => {
        prof.push({
          label: d.emailId,
          value: d.name + '-' + d.emailId,
          name: d.name,
          code: 'string',
          dept: 'string',
          shortName: 'string',
          professorEmail: 'string',
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label='Course Name'>
        <Form.Control
          type='text'
          placeholder='Enter course name'
          name='name'
          value={formData.name}
          onChange={handleFormChange}
        />
      </FloatingLabel>

      <FloatingLabel label='Course Code'>
        <Form.Control
          type='text'
          placeholder='Enter course code'
          name='code'
          value={formData.code}
          onChange={handleFormChange}
        />
      </FloatingLabel>

      <FloatingLabel label='Department'>
        <Form.Control
          type='text'
          placeholder='Enter department'
          name='dept'
          value={formData.dept}
          onChange={handleFormChange}
        />
      </FloatingLabel>
      <Form.Group>
        <Form.Label>Coures</Form.Label>
        <Select
          options={professors}
          value={formData.professorEmail}
          onChange={(e) => {
            console.log(e)
          }}
        />
      </Form.Group>

      <button type='submit'>Submit</button>
    </Form>
  )
}

export default CourseForm
