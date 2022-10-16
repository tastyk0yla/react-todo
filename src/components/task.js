import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultPropt = {
    activeFilter: 'all',
  }

  static propTypes = {
    item: PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.number,
      isCompleted: PropTypes.bool,
      isChanging: PropTypes.bool,
      timestamp: PropTypes.number,
    }),

    activeFilter: PropTypes.string.isRequired,

    deleteItem: PropTypes.func.isRequired,
    changeActiveStatus: PropTypes.func.isRequired,
    activateChangeAction: PropTypes.func.isRequired,
    updateItemText: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  }

  render() {
    const {
      item,
      deleteItem,
      changeActiveStatus,
      activateChangeAction,
      updateItemText,
      handleInputChange,
      activeFilter,
    } = this.props
    const { text, timestamp, isCompleted, isChanging, id } = item

    let classStr = ''
    if (isCompleted) classStr += ' completed'
    if (isChanging) classStr += ' editing'

    const isFilterMatchingActive = activeFilter === 'active' && !isCompleted
    const isFilterMatchingcompleted = activeFilter === 'completed' && isCompleted

    const isFiltered = activeFilter === 'all' || isFilterMatchingActive || isFilterMatchingcompleted ? true : false

    const element = (
      <li className={classStr}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label
            onClick={() => {
              changeActiveStatus(id)
            }}
          >
            <span className="description">{text}</span>
            <span className="created">{`created ${formatDistanceToNow(timestamp, { includeSeconds: true })} ago`}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              activateChangeAction(id)
            }}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              deleteItem(id)
            }}
          ></button>
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={text}
          onChange={(event) => {
            handleInputChange(this, event)
          }}
          onKeyPress={(event) => {
            if (event.key !== 'Enter') return
            updateItemText(id, this.state.value)
          }}
        />
      </li>
    )

    return isFiltered ? element : null
  }
}
