import React from 'react'
import List from './lists'
import NewList from './newList'

class BoardLists extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      show: false
    }
    this.updateLists = this.updateLists.bind(this)
    this.toggleAddCardDiv = this.toggleAddCardDiv.bind(this)
    this.addNewList = this.addNewList.bind(this)
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

  toggleAddCardDiv () {
    this.setState({show: !this.state.show})
  }

  addNewList () {
    this.toggleAddCardDiv()
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
          <li>{this.state.show
            ? <NewList boardId={this.props.match.params.boardId} onUpdate={this.addNewList} />
            : <a onClick={this.toggleAddCardDiv}>+ Add Another list</a>
          }</li>
        </ul>
      </div>
    )
  }
}

export default BoardLists
