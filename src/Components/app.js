import React, {Component} from 'react'
import Header from './header'
import Boards from './boards'
import Board from './board'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/' render={props => <Header />} />
          <Route exact path='/' render={() => (<Redirect to='/boards' />)} />
          <Route exact path='/boards' render={props => <Boards />} />
          <Route exact path='/b/:boardId' render={props => <Board {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App
