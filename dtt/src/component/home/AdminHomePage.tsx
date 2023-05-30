import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import StudentRegister from '../forms/StudentRegister'
import ProfessorRegister from '../forms/ProfessorRegister'
import AdminRegister from '../forms/AdminRegister'
import TimeTableForm from '../forms/TimeTableForm'
import CourseForm from '../forms/CourseForm'
import { useHistory } from 'react-router-dom'

const AdminHomePage = () => {
  const [registerRole, setRegisterRole] = useState<string>('')
  const history = useHistory()
  useEffect(() => {
    console.log(registerRole)
  }, [registerRole])

  return (
    <>
      <h1
        style={{
          justifyContent: 'center',
          display: 'flex',
        }}
        className='my-3'
      >
        Welcome {localStorage.getItem('userName')}
      </h1>
      <Accordion flush style={{ margin: '2%' }}>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Register User</Accordion.Header>
          <Accordion.Body>
            {/* <Form> */}
            <FloatingLabel controlId='floatingSelect' label='User'>
              <Form.Select
                aria-label='Floating label select example'
                onChange={(e) => setRegisterRole(e.target.value)}
              >
                <option>Open this select menu</option>
                <option value='Student'>Student</option>
                <option value='Professor'>Professor</option>
                <option value='Admin'>Admin</option>
              </Form.Select>
            </FloatingLabel>
            {registerRole === 'Student' && <StudentRegister />}
            {registerRole === 'Professor' && <ProfessorRegister />}
            {registerRole === 'Admin' && <AdminRegister />}
            {/* </Form> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Create Course</Accordion.Header>
          <Accordion.Body>
            <CourseForm />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Create TimeTable</Accordion.Header>
          <Accordion.Body>
            <TimeTableForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default AdminHomePage
