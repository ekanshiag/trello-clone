import React from 'react'
import {Link} from 'react-router-dom'
import NewBoard from './newBoard'

class Boards extends React.Component {
  constructor () {
    super()
    this.state = {
      boards: [],
      show: false
    }
    this.addNewBoard = this.addNewBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
    this.toggleNewBoardDiv = this.toggleNewBoardDiv.bind(this)
  }

  componentDidMount () {
    this.updateBoard()
  }

  addNewBoard () {
    this.toggleNewBoardDiv()
    this.updateBoard()
  }

  toggleNewBoardDiv () {
    this.setState({show: !this.state.show})
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
      <div>
        <h2>Personal Boards</h2>
        <ul>
          {boards}
          <li>{this.state.show
            ? <NewBoard onUpdate={this.addNewBoard} />
            : <a onClick={this.toggleNewBoardDiv}>Create New Board...</a>
          }</li>
        </ul>
      </div>
    )
  }
}

export default Boards
