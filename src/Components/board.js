import React, {Fragment} from 'react'
import List from './lists'
import NewList from './newList'
import {Typography, Grid, Card, Button} from '@material-ui/core'

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      lists: [],
      show: false
    }
    this.updateLists = this.updateLists.bind(this)
    this.toggleAddCardDiv = this.toggleAddCardDiv.bind(this)
    this.addNewList = this.addNewList.bind(this)
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

  toggleAddCardDiv () {
    this.setState({show: !this.state.show})
  }

  addNewList () {
    this.toggleAddCardDiv()
    this.updateLists()
  }

  render () {
    return (
      <Fragment>
        <Typography variant='h6' style={{margin: '10px', padding: '20px'}}>
          {this.state.title}
        </Typography>
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
