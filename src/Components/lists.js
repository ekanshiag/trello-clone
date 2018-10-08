import React from 'react'

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
      </div>
    )
  }
}

export default Lists
