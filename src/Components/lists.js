import React from 'react'
import Cards from './card'
import NewCard from './newCard'
import {Card, List, Button, ListItem, TextField, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

class Lists extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.list.title,
      cards: this.props.list.cards,
      show: false,
      editTitle: false
    }
    this.toggleNewCardDiv = this.toggleNewCardDiv.bind(this)
    this.addCard = this.addCard.bind(this)
    this.toggleEditTitle = this.toggleEditTitle.bind(this)
    this.saveTitle = this.saveTitle.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.updateCards = this.updateCards.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.deleteList = this.deleteList.bind(this)
  }

  toggleEditTitle () {
    this.setState({editTitle: !this.state.editTitle})
  }

  toggleNewCardDiv () {
    this.setState({show: !this.state.show})
  }

  onDragStart (event, card) {
    event.dataTransfer.setData('id', card._id)
    event.dataTransfer.setData('card', card)
  }

  updateCards () {
    fetch('http://localhost:8000/list/' + this.props.list._id + '/card')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({cards: result})
      })
  }

  onDrop (event, listId) {
    let cardId = event.dataTransfer.getData('id')
    let data = {
      list: listId
    }
    let myInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:8000/card/' + cardId, myInit)
      .then(() => this.updateCards())
  }

  saveTitle (event) {
    if (event.key !== 'Enter') return
    let data = {
      title: event.target.value
    }
    let myInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:8000/list/' + this.props.list._id, myInit)
      .then(this.toggleEditTitle())
  }

  addCard () {
    fetch('http://localhost:8000/list/' + this.props.list._id + '/card')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({cards: result})
        this.toggleNewCardDiv()
        this.props.onUpdate()
      })
  }

  removeCard (card) {
    let array = this.state.cards
    array = array.filter(c => c !== card)
    this.setState({cards: array})
  }

  deleteList () {
    let myInit = {
      method: 'DELETE'
    }
    fetch('http://localhost:8000/list/' + this.props.list._id, myInit)
      .then(() => {
        this.props.onUpdate()
      })
  }

  render () {
    return (
      <Card
        onDragOver={e => e.preventDefault()}
        onDrop={e => this.onDrop(e, this.props.list._id)}>
        <TextField
          type='text'
          disabled={this.state.editTitle}
          value={this.state.title}
          onDoubleClick={this.toggleEditTitle}
          onChange={event => { this.setState({title: event.target.value}) }}
          onKeyDown={event => { this.saveTitle(event) }}
        />
        <IconButton onClick={this.deleteList}>
          <DeleteIcon />
        </IconButton>
        <List component='ul'>
          {this.state.cards.map(card => (
            <ListItem
              key={card._id}
              draggable
              onDragStart={e => { this.onDragStart(e, card) }}
              onDragEnd={e => { this.removeCard(card) }}
            >
              <Cards card={card} onUpdate={this.updateCards} />
            </ListItem>
          ))}
        </List>
        {this.state.show
          ? <NewCard listId={this.props.list._id}
            onUpdate={this.addCard}
            onClose={this.toggleNewCardDiv} />
          : <Card>
            <Button onClick={this.toggleNewCardDiv}>
                  +Add New Card
            </Button>
          </Card>}
      </Card>
    )
  }
}

export default Lists
