import { userInfo } from 'os'
import React, { useEffect } from 'react'
import TimeTable from '../TimeTable'

interface propsType {
  userInfo: UserInfoType
}
const tableData = null

const StudentHomePage = (props: propsType) => {
  useEffect(() => {
    // props.userInfo
  }, [])
  return (
    <>
      <h1>Hello {userInfo.name}</h1>
      {/* <TimeTable tableData={tableData} /> */}
    </>
  )
}

export default StudentHomePage
