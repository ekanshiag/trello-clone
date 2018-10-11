import React, {Fragment} from 'react'
import List from './lists'
import NewList from './newList'
import {Typography, Grid, Card, Button, TextField} from '@material-ui/core'

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      lists: [],
      show: false,
      editTitle: false
    }
    this.updateLists = this.updateLists.bind(this)
    this.toggleAddCardDiv = this.toggleAddCardDiv.bind(this)
    this.addNewList = this.addNewList.bind(this)
    this.toggleEditTitle = this.toggleEditTitle.bind(this)
    this.saveTitle = this.saveTitle.bind(this)
    this.updateLists()
  }

  updateLists () {
    fetch('http://localhost:8000/boards/' + this.props.match.params.boardId)
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({title: result.title, lists: result.lists})
      })
  }

  toggleEditTitle () {
    this.setState({editTitle: !this.state.editTitle})
  }

  toggleAddCardDiv () {
    this.setState({show: !this.state.show})
  }

  addNewList () {
    this.toggleAddCardDiv()
    this.updateLists()
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
    fetch('http://localhost:8000/boards/' + this.props.match.params.boardId, myInit)
      .then(() => {
        this.toggleEditTitle()
        this.setState({data})
      })
  }

  render () {
    return (
      <Fragment>
        <TextField
          type='input'
          disabled={!this.state.editTitle}
          value={this.state.title}
          onDoubleClick={this.toggleEditTitle}
          onChange={event => { this.setState({title: event.target.value}) }}
          onKeyDown={event => { this.saveTitle(event) }} />
        {/* {this.setState.editTitle
          ? <TextField input='type' onChange={event => { this.setState({ title: event.target.value }) }} />
          : <Typography onClick={this.toggleEditTitle} variant='button' style={{margin: '10px', padding: '20px'}}>
            {this.state.title}
          </Typography>
        } */}
        <Grid container>
          {this.state.lists.map(l => (
            <Grid item key={l._id} style={{margin: '10px', padding: '20px', height: '100px'}}>
              <List list={l} onUpdate={this.updateLists} />
            </Grid>
          ))}
          <Grid item style={{margin: '10px', padding: '20px', height: '100px'}}>
            {this.state.show
              ? <NewList boardId={this.props.match.params.boardId} onUpdate={this.addNewList} onClose={this.toggleAddCardDiv} />
              : <Card>
                <Button onClick={this.toggleAddCardDiv}>
                    + Add Another List
                </Button>
              </Card>}
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default Board
