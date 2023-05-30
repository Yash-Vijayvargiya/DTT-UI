import React, { useEffect } from 'react'
import TimeTable from './TimeTable'
import AdminHomePage from './home/AdminHomePage'
import ProfessorHomePage from './home/ProfessorHomePage'
import ProfessorUpdate from './updates/ProfessorUpdate'
import { useHistory } from 'react-router-dom'
import StudentHomePage from './home/StudentHomePage'

const tableData = {
  Mon: {},
  Tues: {},
  Wed: {},
  Thur: {},
  Fri: {},
}

const Home = (props: Props) => {
  const history = useHistory()
  useEffect(() => {
    props.setShowNavBar(true)
  }, [])
  useEffect(() => {
    if (
      localStorage.getItem('userName') === '' ||
      typeof localStorage.getItem('userName') === 'undefined' ||
      localStorage.getItem('userName') === null
    ) {
      history.push('/')
    }
    console.log(localStorage.getItem('userName'))
  }, [])

  if (localStorage.getItem('role')?.toLowerCase() == 'admin')
    return <AdminHomePage />
  else if (localStorage.getItem('role')?.toLowerCase() == 'professor')
    return <ProfessorHomePage />
  else if (localStorage.getItem('role')?.toLowerCase() == 'student')
    return <StudentHomePage />
  else return <AdminHomePage />
}

interface Props {
  setShowNavBar: (value: boolean) => void
}

export default Home
