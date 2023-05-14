import React, { useEffect } from 'react'
import TimeTable from './TimeTable'
import AdminHomePage from './home/AdminHomePage'

const tableData = {
  Mon: {},
  Tues: {},
  Wed: {},
  Thur: {},
  Fri: {},
}

const Home = (props: Props) => {
  useEffect(() => {
    props.setShowNavBar(true)
  }, [])
  useEffect(() => {}, [])
  return <AdminHomePage />
}

interface Props {
  setShowNavBar: (value: boolean) => void
}

export default Home
