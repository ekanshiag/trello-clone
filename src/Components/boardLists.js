import React from 'react'
import List from './lists'

class BoardLists extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: []
    }
    this.updateLists = this.updateLists.bind(this)
  }

  updateLists () {
    fetch('http://localhost:8000/board/' + this.props.match.params.boardId)
      .then(result => {
        return result.json()
      })
      .then(result => {
        console.log(result)
        this.setState({lists: result})
      })
  }

  componentDidMount () {
    this.updateLists()
  }

  render () {
    return (
      <div>
        <h1>lists</h1>
        <ul>
          {this.state.lists.map(l => (
            <List key={l._id} list={l} onUpdate={this.updateLists} />
          ))}
        </ul>
      </div>
    )
  }
}

export default BoardLists
