import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { isClassDeclaration } from 'typescript'
// import '../style/Login.css'
import { Constants } from '../constants'

interface propsType {
  setUserInfo: (value: UserInfoType) => void
  setShowNavBar: (value: boolean) => void
}
const LoginForm = (props: propsType) => {
  const history = useHistory()
  const setUser = props.setUserInfo
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    props.setShowNavBar(false)
  }, [])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // call onLogin with email and password
    onLogin(email, password)
  }
  const onLogin = (email: string, password: string) => {
    const data = { email: email, password: password }
    axios
      .post(Constants.BASE_URL + '/auth/authenticate', data)
      .then((response) => {
        props.setUserInfo({
          userName: response.data.userName,
          jwtToken: response.data.token,
          userRole: response.data.role,
          classId: response.data.classId,
        })
        localStorage.setItem('jwtToken', response.data.token)
        localStorage.setItem('userName', response.data.userName)
        localStorage.setItem('userEmail', response.data.emailId)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('classId', response.data.classId)
        console.log(response.data)
        history.push('/home')
      })
      .catch(() => {
        console.log('error')
      })
      .finally(() => console.log('hello kitty'))
  }

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='form-group mt-3'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control mt-1'
              placeholder='Enter email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              className='form-control mt-1'
              placeholder='Enter password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
          <p className='forgot-password text-right mt-2'>
            Forgot <a href='#'>password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
