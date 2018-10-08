import React from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import BoardLists from './boardLists'

class Boards extends React.Component {
  constructor () {
    super()
    this.state = {
      boards: []
    }
    this.createNewBoard = this.createNewBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
  }

  componentDidMount () {
    this.updateBoard()
  }

  createNewBoard () {
    let title = prompt('Enter board title')
    let data = {
      title
    }
    let myInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:8000/board', myInit)
      .then(() => {
        this.updateBoard()
      })
  }

  updateBoard () {
    fetch('http://localhost:8000/board')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({boards: result})
      })
  }
  render () {
    const boards = this.state.boards.map(board =>
      (<li key={board._id}>
        <Link to={`/b/${board._id}`}>{board.title}</Link>
      </li>)
    )
    return (
      <Router>
        <div>
          <Route exact path='/boards' render={() => (
            <div>
              <h2>Personal Boards</h2>
              <ul>
                {boards}
                <li><a onClick={this.createNewBoard}>Create New Board...</a></li>
              </ul>
            </div>
          )
          } />
          <Route path='/b/:boardId' component={BoardLists} />
        </div>
      </Router>
    )
  }
}

export default Boards