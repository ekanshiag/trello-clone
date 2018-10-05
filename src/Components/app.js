import React, {Component} from 'react'
import HeaderComp from './headerComp'
import BoardComp from './Boards'
import {Router, Link, Route} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <HeaderComp />
        <Route path='/' Component={BoardComp} />
      </Router>
    )
  }
}

export default App
