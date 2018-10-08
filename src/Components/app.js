import React, {Component} from 'react'
import Header from './header'
import Boards from './boards'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' render={() => (<Redirect to='/boards' />)} />
          <Route exact path='/boards' component={Boards} />
        </div>
      </Router>
    )
  }
}

export default App
