import React from 'react'
import Table from 'react-bootstrap/Table'
import { Constants } from '../constants'
interface timeTableData {
  classId: string
  shortName: string
  location: string
}
interface DictionaryOfDictionary {
  [key: string]: {
    [innerKey: string]: timeTableData
  }
}
interface propsType {
  tableData: DictionaryOfDictionary
}
const cellValue = (data: timeTableData) => {
  return data.classId + '|' + data.shortName + '|' + data.location
}
const TimeTable = (props: propsType) => {
  return (
    <>
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
                  {typeof props.tableData[day][period] == 'undefined'
                    ? '-'
                    : cellValue(props.tableData[day][period])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TimeTable
