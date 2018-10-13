import React, {Fragment} from 'react'
import { Typography, List, ListItem, Checkbox, ListItemText, Button, TextField } from '@material-ui/core'

let newItem = ''

export default class Checklist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checklist: this.props.checklist,
      showAddItem: false
    }
    this.toggleShowDiv = this.toggleShowDiv.bind(this)
    this.addItem = this.addItem.bind(this)
    this.toggleStatus = this.toggleStatus.bind(this)
  }

  addItem () {
    let newTask = {task: newItem, done: false}
    let tasks = this.state.checklist.slice()
    tasks.push(newTask)
    this.setState({checklist: tasks, showAddItem: false})
    this.props.onAdd(newTask)
  }

  toggleShowDiv () {
    this.setState({showAddItem: !this.state.showAddItem})
  }

  toggleStatus (index) {
    let temp = this.state.checklist
    temp[index].done = !temp[index].done
    this.setState({checklist: temp})
    this.props.onStatusChange(temp)
  }

  render () {
    var listItems = this.state.checklist
      ? this.state.checklist.map((item, index) => (
        <ListItem
          key={index}
          button
          onClick={() => { this.toggleStatus(index) }}
        >
          <Checkbox
            checked={item.done}
            disableRipple
          />
          <ListItemText>
            {item.task}
          </ListItemText>
        </ListItem>))
      : null
    return (
      <Fragment>
        <Typography variant='subtitle1'>
          Checklist
        </Typography>
        <List>
          { listItems }
        </List>
        <TextField
          type='text'
          multiline
          fullWidth
          rows={2}
          disabled={!this.state.showAddItem}
          placeholder='Add an item...'
          onDoubleClick={this.toggleShowDiv}
          onChange={event => { newItem = event.target.value }}
        />
        {this.state.showAddItem
          ? <Button
            size='small'
            onClick={this.addItem}
          >
            Add
          </Button>
          : null}
      </Fragment>
    )
  }
}
