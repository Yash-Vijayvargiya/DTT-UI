import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import type { RouteComponentProps } from 'react-router-dom'
import NavBar from './component/NavBar/NavBar'
import Home from './component/Home'
import Contact from './component/Contact'
import Notification from './component/Notification'
import LoginForm from './component/LoginForm'

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    userName: '',
    jwtToken: '',
    userRole: '',
    classId: '',
  })
  const [showNavBar, setshowNavBar] = useState(false)
  return (
    <Router>
      {showNavBar && <NavBar />}

      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <LoginForm
              setUserInfo={setUserInfo}
              setShowNavBar={setshowNavBar}
            />
          )}
        />
        <Route
          path='/home'
          render={() => <Home setShowNavBar={setshowNavBar} />}
        />
        <Route path='/notification' component={Notification} />
        <Route path='/contact' component={Contact} />
      </Switch>
    </Router>
  )
}

export default withRouter(App)
