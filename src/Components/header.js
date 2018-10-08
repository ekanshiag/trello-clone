import React from 'react'
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
  render () {
    return (
      <div>
        <Link to='/boards'>Trello</Link>
      </div>
    )
  }
}
