import React from 'react'
import {Dialog, DialogContent, DialogActions, TextField, Button} from '@material-ui/core'

class NewBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      value: ''
    }
    this.addBoard = this.addBoard.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.setState({open: false})
    this.props.onClose()
  }

  addBoard () {
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
    fetch('http://localhost:8000/board', myInit)
      .then(() => {
        this.props.onUpdate()
      })
  }

  render () {
    return (
      <div>
        <Dialog open={this.state.open}>
          <DialogContent>
            <TextField
              autoFocus
              type='text'
              placeholder='Enter title for new board..'
              onChange={event => { this.setState({value: event.target.value}) }}
            />
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={this.addBoard}>Add board</Button>
            <Button color='primary' onClick={this.handleClose}>X</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default NewBoard
