import React from 'react'

export default class NewList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.addList = this.addList.bind(this)
  }

  addList () {
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
    fetch ('http://localhost:8000/board/' + this.props.boardId + '/lists', myInit)
      .then(() => {
        this.props.onUpdate()
      })
  }

  render () {
    return (
      <div>
        <input type='text'
          placeholder='Add title for new list'
          onChange={event => { this.setState({value: event.target.value}) }}
        />
        <button onClick={this.addList}>Add List</button>
        <button>X</button>
      </div>
    )
  }
}
