import React from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, Button} from '@material-ui/core'

export default function Header () {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <div>
          <Button color='inherit' component={Link} to='/boards'>Trello</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}
