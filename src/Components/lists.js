import React from 'react'
import Cards from './card'
import NewCard from './newCard'
import {Card, Typography, List, Button, ListItem} from '@material-ui/core'

class Lists extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.list.title,
      cards: this.props.list.cards,
      show: false
    }
    this.toggleNewCardDiv = this.toggleNewCardDiv.bind(this)
    this.addCard = this.addCard.bind(this)
  }

  toggleNewCardDiv () {
    this.setState({show: !this.state.show})
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
        <Typography variant='subtitle1'>
          {this.state.title}
        </Typography>
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
