import React from 'react'

class NewBoard extends React.Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
    this.addBoard = this.addBoard.bind(this)
  }

  addBoard () {
    let data = {
      title: this.state.value
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
        this.props.onUpdate()
      })
  }

  render () {
    return (
      <div>
        <input type='text' placeholder='Enter title for new board..' onChange={event => {this.setState({value: event.target.value})}} />
        <button onClick={this.addBoard}>Add board</button>
        <button>X</button>
      </div>
    )
  }
}

export default NewBoard
