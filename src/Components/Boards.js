import React from 'react'

export default function MainComp () {
  constructor () {
    super()
    this.state = {
      boards: []
    }
  }

  componentWillMount () {
    fetch('http://localhost:8000/board')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({boards: result})
      })
  }

  return (
    <div>
      <h2>Personal Boards</h2>
      <ul>
        {this.state.boards.map(board =>
          (<li key={board._id}>
            <a href= ''>{board.title}</a>
          </li>)
        )}
      </ul>
    </div>
  )
}
