import React from 'react'
import Card from './card'

class Lists extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: []
    }
  }
  render () {
    return (
      <div>
        <h3>{this.props.list.title}</h3>
        {this.props.list.cards.map(card => (
          <Card card={card} />
        ))}
      </div>
    )
  }
}

export default Lists
