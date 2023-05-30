import { userInfo } from 'os'
import React, { useEffect, useState } from 'react'
import TimeTable from '../TimeTable'
import { Constants } from '../../constants'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const tableData = null
type StateDictionary = {
  [key: string]: CellValue[]
}
const StudentHomePage = () => {
  const [cellValues, setCellValues] = useState<StateDictionary>({})

  const periodStringConverter = (id: number) => {
    return Constants.periods[id]
  }
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
  const getBatchTimeTable = () => {
    axios
      .get(
        Constants.BASE_URL +
          '/student/timetable/getWeek/' +
          'ECE_4' +
          '/G2/20230519'
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
  useEffect(() => {
    // props.userInfo
    getBatchTimeTable()
  }, [])
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
      <h1
        style={{
          justifyContent: 'center',
          display: 'flex',
        }}
        className='my-3'
      >
        B.Tech - ECE - 4
      </h1>
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
    </>
  )
}

export default StudentHomePage
