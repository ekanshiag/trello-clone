import React, { Fragment } from 'react'
import {Card, TextField, CardContent, CardActions, Button} from '@material-ui/core'

export default class NewList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.addList = this.addList.bind(this)
  }

  addList () {
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
    fetch('http://localhost:8000/boards/' + this.props.boardId + '/lists', myInit)
      .then(() => {
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
              placeholder='Add title for new list'
              onChange={event => { this.setState({value: event.target.value}) }}
            />
          </CardContent>
          <CardActions>
            <Button onClick={this.addList}>Add List</Button>
            <Button onClick={this.props.onClose}>X</Button>
          </CardActions>
        </Card>
      </Fragment>
    )
  }
}
