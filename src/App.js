import {Switch, Route, Redirect} from 'react-router-dom'

// import InstaShare from './components/InstaShare'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import UserProfile from './components/UserProfile'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
    <Route to="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
