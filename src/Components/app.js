import React, {Component} from 'react'
import HeaderComp from './headerComp'
import MainComp from './mainComp'

class App extends Component {
  render () {
    return (
      <div>
        <HeaderComp />
        <MainComp />
      </div>
    )
  }
}

export default App
