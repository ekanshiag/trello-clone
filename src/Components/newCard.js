import React, {Fragment} from 'react'
import { Card, CardContent, TextField, CardActions, Button } from '@material-ui/core';

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
      <Fragment>
        <Card>
          <CardContent>
            <TextField
              type='text'
              placeholder='Enter title for new card'
              onChange={event => { this.setState({value: event.target.value}) }}
            />
          </CardContent>
          <CardActions>
            <Button onClick={this.addCard}>Add Card</Button>
            <Button onClick={this.props.onClose}>X</Button>
          </CardActions>
        </Card>
      </Fragment>
    )
  }
}
