import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
  }

  state = {
    value: '',
    min: '',
    sec: '',
  }

  handleTimeInputChange = (value, minOrSec) => {
    if (isNaN(value) || value > 60 || value < 0 || value.length > 2) return
    if (minOrSec === 'min') this.setState({ min: value })
    else if (minOrSec === 'sec') this.setState({ sec: value })
  }

  render() {
    const { addNewItem, handleInputChange, mainTarget } = this.props

    return (
      <form
        className="new-todo-form"
        onKeyPress={(event) => {
          const value = this.state.value.trim()
          if (event.key !== 'Enter' || !value) return
          if (!value) return
          this.setState((state) => {
            addNewItem(state)
            event.target.value = ''
            return { value: '', min: '', sec: '' }
          })
        }}
      >
        <input
          aria-label="New task"
          className="new-todo"
          id="newTask"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={(event) => {
            handleInputChange(this, event)
          }}
          autoFocus={mainTarget}
        />
        <label htmlFor="newTask"></label>
        <input
          className="new-todo-form__timer"
          id="newTaskMin"
          placeholder="Min"
          value={this.state.min}
          onChange={(event) => {
            this.handleTimeInputChange(event.target.value, 'min')
          }}
        ></input>
        <label htmlFor="newTaskMin"></label>
        <input
          className="new-todo-form__timer"
          id="newTaskSec"
          placeholder="Sec"
          value={this.state.sec}
          onChange={(event) => {
            this.handleTimeInputChange(event.target.value, 'sec')
          }}
        ></input>
        <label htmlFor="newTaskSec"></label>
      </form>
    )
  }
}
