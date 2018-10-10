import React from 'react'
import Card from './card'
import NewCard from './newCard'

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
      <div>
        <p>{this.state.title}</p>
        {this.state.cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
        { this.state.show
          ? <NewCard listId={this.props.list._id} onUpdate={this.addCard} />
          : <a onClick={this.toggleNewCardDiv}>+ Add new card</a>}
      </div>
    )
  }
}

export default Lists
