import React, {Fragment} from 'react'
import {Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button} from '@material-ui/core'

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
        this.toggleEditCardDiv()
      })
  }

  render () {
    return (
      <Fragment>
        <Card component='button' onClick={this.toggleEditCardDiv}>
          <CardContent>
            <Typography variant='h6'>
              {this.state.title}
            </Typography>
            <Typography variant='body2'>
              {this.state.dueDate}
            </Typography>
          </CardContent>
        </Card>
        <Dialog
          open={this.state.editCard}
          onClose={this.toggleEditCardDiv}>
          <DialogContent>
            <TextField
              type='text'
              placeholder={this.state.title}
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
              onChange={event => {
                this.setState({updateCard: true})
                tempCard.desc = event.target.value
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveCard}>Save</Button>
            <Button onClick={this.toggleEditCardDiv}>X</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
