import { useState, useEffect } from 'react'
import { Form, FloatingLabel, Row, Col, Table } from 'react-bootstrap'
import Select, { ActionMeta, MultiValue } from 'react-select'
import CellForm from './CellForm'
import { Constants } from '../../constants'
import axios from 'axios'
// import { ActionMeta } from 'react-select/src/types'

interface FormProps {
  onSubmit: (formData: FormData) => void
}
type StateDictionary = {
  [key: string]: CellValue
}

interface FormData {
  course: string
  branch: string
  semester: number
}

export default function TimeTableForm() {
  const [formData, setFormData] = useState<FormData>({
    course: '',
    branch: '',
    semester: 1,
  })
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])
  const [cellValues, setCellValues] = useState<StateDictionary>({})
  const [courses, setCourses] = useState<Course[]>()

  const transformCellDataToRequest = () => {
    const ttrequest: TTRequest[] = []
    for (const key in cellValues) {
      const cellValue = cellValues[key]
      ttrequest.push({
        period: key[key.length - 1],
        day: key.slice(0, -1),
        courseCode: cellValue.courseCode,
        type: cellValue.type,
        grp: cellValue.grp,
      })
    }
    return ttrequest
  }

  const handleSelectChange = (selectedCourses: any) => {
    setSelectedCourses(selectedCourses)
  }
  const handleCellSubmit = (key: string, value: CellValue) => {
    setCellValues((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const url =
      Constants.BASE_URL +
      '/admin/timetable/' +
      formData.branch +
      '/' +
      formData.semester

    // onSubmit(formData)
    const data = transformCellDataToRequest()
    axios
      .post(url, data, {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  useEffect(() => {
    const dict: StateDictionary = {}
    Constants.weekdays.map((day, dayIndex) =>
      Constants.periods.map(
        (period, pIndex) =>
          (dict[day + period] = {
            courseCode: '',
            type: '',
            grp: '',
            loc: '',
            name: '',
          })
      )
    )
    setCellValues((prevState) => ({ ...prevState, ...dict }))
  }, [])
  useEffect(() => {
    axios.get(Constants.BASE_URL + '/admin/courses').then((response) => {
      const coursesTemp: Course[] = []
      response.data.map((d: Course) =>
        coursesTemp.push({
          label: d.name,
          code: d.code,
          dept: d.dept,
          value: d.code,
          name: d.name,
          professorEmail: '',
          shortName: d.shortName,
        })
      )
      console.log(response.data)
      setCourses(coursesTemp)
    })
  }, [])

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FloatingLabel controlId='course' label='Course' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Enter course name'
                name='course'
                value={formData.course}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId='branch' label='Branch' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Enter branch name'
                name='branch'
                value={formData.branch}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId='semester'
              label='Semester'
              className='mb-3'
            >
              <Form.Control
                name='semester'
                type='number'
                value={formData.semester}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='courses' className='mb-3'>
              <Form.Label>Coures</Form.Label>
              <Select
                options={courses}
                isMulti
                value={selectedCourses}
                onChange={handleSelectChange}
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>#</th>
                {Constants.periods.map((period, index) => (
                  <th key={index} align='center'>
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Constants.weekdays.map((day, index) => (
                <tr>
                  <td align='center'>{day}</td>
                  {Constants.periods.map((period, _) => (
                    <td key={day + period} align='center'>
                      <CellForm
                        id={day + period}
                        cellValue={cellValues[day + period]}
                        handleSubmit={handleCellSubmit}
                        courses={selectedCourses}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </Form>
    </>
  )
}
