import React from 'react'

export default class AddNewCard extends React.Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
    this.addCard = this.addCard.bind(this)
  }

  addCard () {
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
    fetch('http://localhost:8000/list/' + this.props.listId + '/card', myInit)
      .then(response => {
        this.props.onUpdate()
      })
  }

  render () {
    return (
      <div>
        <input type='text' placeholder='Enter title for new card' onChange={event => { this.setState({value: event.target.value}) }} />
        <button onClick={this.addCard}>Add Card</button>
        <button>X</button>
      </div>
    )
  }
}
