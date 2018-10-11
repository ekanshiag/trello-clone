import React from 'react'
import Cards from './card'
import NewCard from './newCard'
import {Card, List, Button, ListItem, TextField} from '@material-ui/core'

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
  }

  toggleEditTitle () {
    this.setState({editTitle: !this.state.editTitle})
  }

  toggleNewCardDiv () {
    this.setState({show: !this.state.show})
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

  render () {
    return (
      <Card>
        <TextField
          type='text'
          disabled={this.state.editTitle}
          value={this.state.title}
          onDoubleClick={this.toggleEditTitle}
          onChange={event => { this.setState({title: event.target.value}) }}
          onKeyDown={event => { this.saveTitle(event) }}
        />
        <List component='ul'>
          {this.state.cards.map(card => (
            <ListItem key={card._id}>
              <Cards card={card} />
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
