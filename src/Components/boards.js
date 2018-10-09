import React from 'react'
import {Link} from 'react-router-dom'
import NewBoard from './newBoard'
import {Typography, Grid, Card, CardActions, CardContent, Button} from '@material-ui/core'

class Boards extends React.Component {
  constructor () {
    super()
    this.state = {
      boards: [],
      show: false
    }
    this.addNewBoard = this.addNewBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
    this.toggleNewBoardDiv = this.toggleNewBoardDiv.bind(this)
    this.updateBoard()
  }

  addNewBoard () {
    this.toggleNewBoardDiv()
    this.updateBoard()
  }

  toggleNewBoardDiv () {
    this.setState({show: !this.state.show})
  }

  updateBoard () {
    fetch('http://localhost:8000/board')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({boards: result})
      })
  }

  render () {
    const boards = this.state.boards.map(board =>
      (<Card>
        <CardActions>
          <Button component={Link} to={`/b/${board._id}`}>{board.title}</Button>
        </CardActions>
      </Card>)
    )
    return (
      <div>
        <Typography variant='h5'>
        Personal Boards
        </Typography>
        <Grid container>
          {boards}
          {this.state.show
            ? <NewBoard onUpdate={this.addNewBoard} />
            : <Card>
              <CardActions>
                <Button onClick={this.toggleNewBoardDiv}>Create New Board...</Button>
              </CardActions>
            </Card>
          }
        </Grid>
      </div>
    )
  }
}

export default Boards
