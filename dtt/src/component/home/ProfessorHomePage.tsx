import React, { useState, useEffect } from 'react'
import {
  Form,
  ToggleButton,
  FloatingLabel,
  Row,
  Col,
  Table,
} from 'react-bootstrap'
import './../../style/Toggle.css'
import { Constants } from '../../constants'
import CellForm from '../forms/CellForm'
import axios from 'axios'

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
type StateDictionary = {
  [key: string]: CellValue[]
}
interface FormData {
  degree: string
  semester: string
  course: string
}
const ProfessorHomePage = () => {
  const [formData, setFormData] = useState<FormData>({
    degree: '',
    semester: '',
    course: '',
  })
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [cellValues, setCellValues] = useState<StateDictionary>({})

  useEffect(() => {
    getPersonalisedTimeTable()
  }, [])
  useEffect(() => {
    if (readOnly) {
      getPersonalisedTimeTable()
    } else if (
      formData.course === '' ||
      formData.degree === '' ||
      formData.semester === ''
    )
      initialiseTimeTable()
    else getBatchTimeTable()
    console.log(formData)
  }, [readOnly, formData])

  const cellFormat = (data: CellValue) => {
    if (typeof data == 'undefined') return '-'
    if (
      typeof data.name == 'undefined' ||
      typeof data.loc == 'undefined' ||
      data.name === null
    )
      return ' - '
    if (data.name === '' || data.loc === '') return ' - '
    if (data.type.toLowerCase() === 'class') return data.name + ' ' + data.loc
    if (data.type.toLowerCase() === 'tut')
      return data.name + ' tut  ' + data.grp + ' ' + data.loc
    if (data.type.toLowerCase() === 'lab')
      return data.name + ' ' + data.grp + ' ' + data.loc
    return data.name + ' ' + data.loc
  }
  const initialiseTimeTable = () => {
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
    console.log(dict)
    setCellValues(dict)
  }

  const getBatchTimeTable = () => {
    console.log(formData)
    axios
      .get(
        Constants.BASE_URL +
          '/professor/timetable/' +
          formData.course +
          '/' +
          formData.semester
      )
      .then((response) => {
        const dict: StateDictionary = {}
        Constants.weekdays.map((day, dayIndex) =>
          Constants.periods.map((period, pIndex) => (dict[day + period] = []))
        )
        response.data.map(
          (d: TimeTable) =>
            (dict[d.day + periodStringConverter(d.period - 1)] = [
              ...dict[d.day + periodStringConverter(d.period - 1)],
              {
                courseCode: d.courseCode,
                type: d.type,
                grp: d.grp,
                loc: d.loc,
                name: d.courseName,
              },
            ])
        )
        Constants.weekdays.map((day, dayIndex) =>
          Constants.periods.map((period, pIndex) =>
            dict[day + period].length === 0
              ? (dict[day + period] = [
                  {
                    courseCode: '',
                    type: '',
                    grp: '',
                    loc: '',
                    name: '',
                  },
                ])
              : dict[day + period]
          )
        )
        console.log(response.data, dict)
        setCellValues(dict)
      })
  }
  const getPersonalisedTimeTable = () => {
    axios
      .get(
        Constants.BASE_URL +
          '/professor/getTimetable/' +
          localStorage.getItem('userEmail')
      )
      .then((response) => {
        let dict: StateDictionary = {}
        Constants.weekdays.map((day, dayIndex) =>
          Constants.periods.map((period, pIndex) => (dict[day + period] = []))
        )
        response.data.map(
          (d: TimeTable) =>
            (dict[d.day + periodStringConverter(d.period - 1)] = [
              ...dict[d.day + periodStringConverter(d.period - 1)],
              {
                courseCode: d.courseCode,
                type: d.type,
                grp: d.grp,
                loc: d.loc,
                name: d.courseName,
              },
            ])
        )
        Constants.weekdays.map((day, dayIndex) =>
          Constants.periods.map((period, pIndex) =>
            dict[day + period].length === 0
              ? (dict[day + period] = [
                  {
                    courseCode: '',
                    type: '',
                    grp: '',
                    loc: '',
                    name: '',
                  },
                ])
              : dict
          )
        )
        console.log(response.data, dict)
        setCellValues(dict)
      })
  }
  const periodStringConverter = (id: number) => {
    return Constants.periods[id]
  }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDegreeChange = (
    selectedOption: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, degree: selectedOption.target.value })
  }

  const handleSemesterChange = (
    selectedOption: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, semester: selectedOption.target.value })
  }

  const handleCourseChange = (
    selectedOption: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, course: selectedOption.target.value })
  }

  const handleToggle = () => {
    setReadOnly(!readOnly)
  }
  const handleCellSubmit = (key: string, value: CellValue) => {
    setCellValues((prevState) => ({
      ...prevState,
      [key]: [value, ...prevState[key]],
    }))
  }
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

      <Form className='mx-3'>
        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='degree'>
              <FloatingLabel controlId='degree' label='Degree'>
                <Form.Select
                  value={formData.degree}
                  disabled={readOnly}
                  onChange={handleDegreeChange}
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
            <Form.Group controlId='semester'>
              <FloatingLabel controlId='semester' label='Semester'>
                <Form.Select
                  disabled={readOnly}
                  onChange={handleSemesterChange}
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
          <Col>
            <Form.Group controlId='course'>
              <FloatingLabel controlId='course' label='Course'>
                <Form.Select disabled={readOnly} onChange={handleCourseChange}>
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
        </Row>
        <Row className='mb-3'>
          <Col>
            <label
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '60px',
                height: '30px',
              }}
            >
              <input
                className='toggleInput'
                type='checkbox'
                defaultChecked={readOnly}
                onClick={handleToggle}
                style={{ opacity: '0', width: '0', height: '0' }}
              />
              <span className='toggleSpan' />
              <strong
                style={{
                  position: 'absolute',
                  left: '100%',
                  width: 'max-content',
                  lineHeight: '30px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              >
                Personal
              </strong>
            </label>
          </Col>
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
                      {cellValues[day + period]?.map((cellValue, index) =>
                        index === 0 ? (
                          <p>{cellFormat(cellValue)}</p>
                        ) : (
                          <>
                            <hr />
                            <p>{cellFormat(cellValue)}</p>
                          </>
                        )
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Form>
    </>
  )
}

export default ProfessorHomePage
