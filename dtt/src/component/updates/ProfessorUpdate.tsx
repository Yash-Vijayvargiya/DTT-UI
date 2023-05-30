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
import ChangeForm from '../forms/ChangeForm'
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
  [key: string]: CellValue
}
interface FormData {
  degree: string
  semester: string
  course: string
}
const ProfessorUpdate = () => {
  const [formData1, setFormData1] = useState({
    degree: '',
    semester: '',
    course: '',
  })
  const [formData2, setFormData2] = useState({
    degree: '',
    semester: '',
    course: '',
  })
  const [cellValues1, setCellValues1] = useState<StateDictionary>({})
  const [cellValues2, setCellValues2] = useState<StateDictionary>({})
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    getCourses()
    getPersonalisedTimeTable(setCellValues2)
    initialiseTimeTable(setCellValues1)
  }, [])
  useEffect(() => {
    if (
      formData1.course === '' ||
      formData1.degree === '' ||
      formData1.semester === ''
    )
      initialiseTimeTable(setCellValues1)
    else getBatchTimeTable(formData1, setCellValues1)
  }, [formData1])

  const cellFormat = (data: CellValue) => {
    if (typeof data == 'undefined') return '-'
    if (
      typeof data.name == 'undefined' ||
      typeof data.loc == 'undefined' ||
      data.name === null
    )
      return ' - '
    if (data.name === '' || data.loc === '') return ' - '
    if (data.type.toLowerCase() === 'class') return data.name + '|' + data.loc
    if (data.type.toLowerCase() === 'tut')
      return data.name + ' tut  ' + data.grp + '|' + data.loc
    if (data.type.toLowerCase() === 'lab')
      return data.name + ' ' + data.grp + '|' + data.loc
    return data.name + '|' + data.loc
  }
  const initialiseTimeTable = (
    setCellValues: (value: StateDictionary) => void
  ) => {
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
    console.log(dict)
    setCellValues(dict)
  }
  const getCourses = () => {
    axios
      .get(
        Constants.BASE_URL +
          '/professor/' +
          localStorage.getItem('userEmail') +
          '/courses'
      )
      .then((response) => {
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
  }
  const getBatchTimeTable = (
    formData: FormData,
    setCellValues: (value: StateDictionary) => void
  ) => {
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
        response.data.map(
          (d: TimeTable) =>
            (dict[d.day + periodStringConverter(d.period - 1)] = {
              courseCode: d.courseCode,
              type: d.type,
              grp: d.grp,
              loc: d.loc,
              name: d.courseName,
            })
        )
        console.log(response.data, dict)
        setCellValues(dict)
      })
  }
  const getPersonalisedTimeTable = (
    setCellValues: (value: StateDictionary) => void
  ) => {
    axios
      .get(
        Constants.BASE_URL +
          '/professor/getTimetable/' +
          localStorage.getItem('userEmail')
      )
      .then((response) => {
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
        response.data.map(
          (d: TimeTable) =>
            (dict[d.day + periodStringConverter(d.period - 1)] = {
              courseCode: d.courseCode,
              type: d.type,
              grp: d.grp,
              loc: d.loc,
              name: d.courseName,
            })
        )
        console.log(response.data, dict)
        setCellValues(dict)
      })
  }
  const periodStringConverter = (id: number) => {
    return Constants.periods[id]
  }
  const handleFormChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value })
  }

  function handleCellSubmit(key: string, value: CellValue): void {
    throw new Error('Function not implemented.')
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
      <div className='m-3'>
        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='degree'>
              <FloatingLabel controlId='degree' label='Degree'>
                <Form.Select
                  value={formData1.degree}
                  name='degree'
                  onChange={handleFormChange1}
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
                  onChange={handleFormChange1}
                  value={formData1.semester}
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
        <Row className='mb-3'>
          <Col>
            <Form.Group controlId='course'>
              <FloatingLabel controlId='course' label='Course'>
                <Form.Select
                  onChange={handleFormChange1}
                  value={formData1.course}
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
          <Col></Col>
        </Row>
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
                {Constants.periods.map((period, _) =>
                  typeof cellValues1[day + period] === 'undefined' ||
                  typeof cellValues2[day + period] === 'undefined' ||
                  (cellValues1[day + period].courseCode === '' &&
                    cellValues1[day + period].courseCode ===
                      cellValues2[day + period].courseCode) ? (
                    <td
                      key={day + period}
                      align='center'
                      style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                        backgroundColor: '#5aff5e',
                      }}
                    >
                      <ChangeForm
                        id={day + period}
                        cellValue={cellValues1[day + period]}
                        handleSubmit={handleCellSubmit}
                        courses={courses}
                        disableForm={false}
                        deleteType={false}
                      />
                    </td>
                  ) : cellValues1[day + period].courseCode ===
                    cellValues2[day + period].courseCode ? (
                    <td
                      key={day + period}
                      align='center'
                      style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                        backgroundColor: '#fc0703',
                      }}
                    >
                      <ChangeForm
                        id={day + period}
                        cellValue={cellValues1[day + period]}
                        handleSubmit={handleCellSubmit}
                        courses={courses}
                        disableForm={false}
                        deleteType={true}
                      />
                    </td>
                  ) : (
                    <td
                      key={day + period}
                      align='center'
                      style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                      }}
                    >
                      <ChangeForm
                        id={day + period}
                        cellValue={cellValues1[day + period]}
                        handleSubmit={handleCellSubmit}
                        courses={courses}
                        disableForm={true}
                        deleteType={false}
                      />
                      <hr></hr>
                      <ChangeForm
                        id={day + period}
                        cellValue={cellValues2[day + period]}
                        handleSubmit={handleCellSubmit}
                        courses={courses}
                        disableForm={true}
                        deleteType={false}
                      />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ProfessorUpdate
