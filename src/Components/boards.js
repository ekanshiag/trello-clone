import React from 'react'
import {Link} from 'react-router-dom'
import NewBoard from './newBoard'
import {Typography, Grid, Card, CardActions, Button} from '@material-ui/core'

const styles = {
  grid: {
    margin: '10px',
    padding: '20px',
    height: '100px'
  },
  card: {
    height: '100px'
  }
}

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
    fetch('http://localhost:8000/boards')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({boards: result})
      })
  }

  render () {
    const boards = this.state.boards.map(board =>
      (<Grid item sm={3} key={board._id} style={styles.grid}>
        <Card style={styles.card}>
          <CardActions>
            <Button component={Link} to={`/b/${board._id}`}>{board.title}</Button>
          </CardActions>
        </Card>
      </Grid>)
    )
    return (
      <div>
        <Typography variant='h5' style={{padding: '20px', margin: '10px'}}>
        Personal Boards
        </Typography>
        <Grid container >
          {boards}
          {this.state.show
            ? <NewBoard onUpdate={this.addNewBoard} onClose={this.toggleNewBoardDiv} />
            : <Grid item style={styles.grid}>
              <Card style={styles.card}>
                <CardActions>
                  <Button onClick={this.toggleNewBoardDiv}>Create New Board...</Button>
                </CardActions>
              </Card>
            </Grid>
          }
        </Grid>
      </div>
    )
  }
}

export default Boards
