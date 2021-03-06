import React, {Fragment} from 'react'
import {Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Checklist from './checklist'
const moment = require('moment')

let tempCard = {}

export default class Cards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.props.card,
      editCard: false,
      updateCard: false
    }
    this.toggleEditCardDiv = this.toggleEditCardDiv.bind(this)
    this.saveCard = this.saveCard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
  }

  toggleEditCardDiv () {
    this.setState({editCard: !this.state.editCard})
  }

  saveCard () {
    if (!this.state.updateCard) this.toggleEditCardDiv()
    let data = {
      ...tempCard
    }
    let myInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:8000/card/' + this.state._id, myInit)
      .then(() => {
        this.setState({...data})
      })
  }

  deleteCard () {
    let myInit = {
      method: 'DELETE'
    }
    fetch('http://localhost:8000/card/' + this.state._id, myInit)
      .then(() => {
        this.props.onUpdate()
      })
  }

  render () {
    tempCard.checklist = this.state.checklist
    return (
      <Fragment>
        <Card component='button' onClick={this.toggleEditCardDiv}>
          <CardContent>
            <Typography variant='h6'>
              {this.state.title}
            </Typography>
            <Typography variant='subtitle2'>
              {this.state.dueDate ? moment(this.state.dueDate).format('MMM D, YYYY') : null}
            </Typography>
          </CardContent>
        </Card>
        <Dialog
          open={this.state.editCard}
          onClose={this.toggleEditCardDiv}
          fullWidth>
          <DialogActions>
            <Button onClick={this.toggleEditCardDiv}>X</Button>
          </DialogActions>
          <DialogContent>
            <TextField
              type='text'
              placeholder={this.state.title}
              fullWidth
              onChange={event => {
                this.setState({updateCard: true})
                tempCard.title = event.target.value
              }}
            />
            <br />
            <TextField
              type='text'
              label='Description'
              placeholder={this.state.desc}
              fullWidth
              onChange={event => {
                this.setState({updateCard: true})
                tempCard.desc = event.target.value
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br />
            <TextField
              type='Date'
              label='Due Date'
              fullWidth
              defaultValue={moment(this.state.dueDate).format('YYYY-MM-DD')}
              onChange={event => {
                this.setState({updateCard: true})
                tempCard.dueDate = event.target.value
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Checklist
              checklist={this.state.checklist}
              onAdd={item => {
                this.setState({updateCard: true})
                tempCard.checklist.push(item)
              }}
              onStatusChange={newCheckList => {
                this.setState({updateCard: true})
                tempCard.checklist = newCheckList
              }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveCard}>Save</Button>
            <IconButton onClick={this.deleteCard}>
              <DeleteIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
