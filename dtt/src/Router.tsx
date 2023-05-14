import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './component/Home'
import Contact from './component/Contact'
import Notification from './component/Notification'
import LoginForm from './component/LoginForm'
const Router = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route path='/home' component={Home} />
        <Route path='/notification' component={Notification} />
        <Route path='/contact' component={Contact} />
      </Switch>
    </main>
  )
}

export default Router
