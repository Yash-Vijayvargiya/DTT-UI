interface UserInfoType {
  userName: string
  jwtToken: string
  userRole: string
  classId: string
}

type CellValue = {
  courseCode: string
  type: string
  grp: string
  loc: string
  name: string
}

type Course = {
  label: string
  value: string
  name: string
  code: string
  dept: string
  shortName: string
  professorEmail: string
  grp: string
}

type TTRequest = {
  period: string
  day: string
  courseCode: string
  type: string
  grp: string
  loc: string
}

interface OptionType {
  label: string
  value: string
}

type Professor = {
  label: string
  value: string
  name: string
  emailId: string
}
type TimeTable = {
  period: number
  day: string
  courseCode: string
  courseName: string
  type: string
  teacherName: string
  grp: string
  loc: string
}
