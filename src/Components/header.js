import React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

export default function Header () {
  return (
    <AppBar position='static'>
      <ToolBar variant='dense'>
        <div>
          <Button color='secondary' component={Link} to='/boards'>Trello</Button>
        </div>
      </ToolBar>
    </AppBar>
  )
}
