import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  }

  render() {
    const { addNewItem, handleInputChange, mainTarget } = this.props

    return (
      <label htmlFor="newTask">
        <input
          aria-label="New task"
          className="new-todo"
          id="newTask"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={(event) => {
            handleInputChange(this, event)
          }}
          onKeyPress={(event) => {
            if (event.key !== 'Enter' || !event.target.value) return
            if (!event.target.value) return
            this.setState((state) => {
              addNewItem(state.value)
              event.target.value = ''
              return { value: '' }
            })
          }}
          autoFocus={mainTarget}
        />
      </label>
    )
  }
}
