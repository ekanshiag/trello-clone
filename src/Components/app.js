import React, {Component} from 'react'
import './app.css'
import Header from './header'
import Boards from './boards'
import BoardLists from './boardLists'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Route path='/' render={props => <Header />} />
          <Route exact path='/' render={() => (<Redirect to='/boards' />)} />
          <Route exact path='/boards' render={props => <Boards />} />
          <Route exact path='/b/:boardId' render={props => <BoardLists {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App
