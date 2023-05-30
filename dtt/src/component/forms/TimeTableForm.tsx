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
  [key: string]: CellValue[]
}

interface FormData {
  course: string
  degree: string
  semester: number
}

const degreeOptions = [
  { value: 'B.Tech', label: 'B.Tech' },
  { value: 'M.Tech', label: 'M.Tech' },
]

const semesterOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
]

const courseOptions = [
  { value: 'ece', label: 'ECE' },
  { value: 'cs', label: 'CS' },
  { value: 'ee', label: 'EE' },
]
export default function TimeTableForm() {
  const [formData, setFormData] = useState<FormData>({
    course: '',
    degree: '',
    semester: 1,
  })
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])
  const [cellValues, setCellValues] = useState<StateDictionary>({})
  const [courses, setCourses] = useState<Course[]>()

  const transformCellDataToRequest = () => {
    const ttrequest: TTRequest[] = []
    for (const key in cellValues) {
      if (typeof cellValues[key] !== 'undefined')
        cellValues[key].map((cellValue: CellValue) => {
          if (cellValue.courseCode !== '')
            ttrequest.push({
              period: key[key.length - 1],
              day: key.slice(0, -1),
              courseCode: cellValue.courseCode,
              type: cellValue.type,
              grp: cellValue.grp,
              loc: cellValue.loc,
            })
        })
    }
    return ttrequest
  }

  const handleSelectChange = (selectedCourses: any) => {
    setSelectedCourses(selectedCourses)
  }
  const handleCellSubmit = (key: string, value: CellValue, index: number) => {
    let arr = cellValues[key]
    if (index === arr.length - 1) {
      arr = [value, ...arr]
    } else arr[index] = value
    setCellValues((prevState) => ({
      ...prevState,
      [key]: arr,
    }))
    // console.log(cellValues)
  }
  const handleDelete = (key: string, value: CellValue, index: number) => {
    let arr = cellValues[key]
    if (index === arr.length - 1) {
      arr = arr
    } else arr = [...arr.slice(0, index), ...arr.slice(index + 1)]

    setCellValues((prevState) => ({
      ...prevState,
      [key]: arr,
    }))
    // console.log(cellValues)
  }
  useEffect(() => {}, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const url =
      Constants.BASE_URL +
      '/admin/timetable/' +
      formData.course +
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

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  useEffect(() => {
    const dict: StateDictionary = {}
    Constants.weekdays.map((day, dayIndex) =>
      Constants.periods.map(
        (period, pIndex) =>
          (dict[day + period] = [
            {
              courseCode: '',
              type: '',
              grp: '',
              loc: '',
              name: '',
            },
          ])
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
          grp: '',
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
            <Form.Group controlId='degree'>
              <FloatingLabel controlId='degree' label='Degree'>
                <Form.Select
                  value={formData.degree}
                  onChange={handleInputChange}
                >
                  <option value=''>Choose...</option>
                  {degreeOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='course'>
              <FloatingLabel controlId='course' label='Course'>
                <Form.Select
                  onChange={handleInputChange}
                  value={formData.course}
                  name='course'
                >
                  <option value=''>Choose...</option>
                  {courseOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='semester'>
              <FloatingLabel controlId='semester' label='Semester'>
                <Form.Select
                  onChange={handleInputChange}
                  value={formData.semester}
                  name='semester'
                >
                  <option value=''>Choose...</option>
                  {semesterOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
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
                    <td
                      key={day + period}
                      align='center'
                      style={{ verticalAlign: 'middle' }}
                    >
                      {cellValues[day + period]?.map((c, index) => {
                        if (index !== 0) {
                          return (
                            <>
                              <hr />
                              <CellForm
                                index={index}
                                id={day + period}
                                handleSubmit={handleCellSubmit}
                                handleDelete={handleDelete}
                                cellValue={c}
                                courses={selectedCourses}
                              />
                            </>
                          )
                        } else {
                          return (
                            <>
                              <CellForm
                                index={index}
                                id={day + period}
                                handleSubmit={handleCellSubmit}
                                handleDelete={handleDelete}
                                cellValue={c}
                                courses={selectedCourses}
                              />
                            </>
                          )
                        }
                      })}
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
