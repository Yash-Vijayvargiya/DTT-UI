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
}

type TTRequest = {
  period: string
  day: string
  courseCode: string
  type: string
  grp: string
}

type OptionType = {
  label: string
  value: string
  name: string
}

type Professor = {
  name: string
  emailId: string
}
