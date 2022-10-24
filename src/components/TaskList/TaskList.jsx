import PropTypes from 'prop-types'
import { Component } from 'react'

import Task from '../Task'

export default class TaskList extends Component {
  static defaultPropt = {
    data: [],
    activeFilter: 'all',
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    activeFilter: PropTypes.string.isRequired,

    deleteItem: PropTypes.func.isRequired,
    changeActiveStatus: PropTypes.func.isRequired,
    activateChangeAction: PropTypes.func.isRequired,
    updateItemText: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      data,
      activeFilter,
      deleteItem,
      changeActiveStatus,
      activateChangeAction,
      updateItemText,
      handleInputChange,
    } = this.props
    const TodoList = data.map((item) => {
      return (
        <Task
          item={item}
          key={item.id}
          deleteItem={deleteItem}
          changeActiveStatus={changeActiveStatus}
          activateChangeAction={activateChangeAction}
          updateItemText={updateItemText}
          handleInputChange={handleInputChange}
          activeFilter={activeFilter}
          id={item.id}
        />
      )
    })
    return <ul className="todo-list">{TodoList}</ul>
  }
}
