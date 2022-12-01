import { React, Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
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
    timerTime: '00:00',
  }

  timerOn = () => {
    this.timer = setInterval(() => {
      let [mins, secs] = this.state.timerTime.split(':')
      mins = Number(mins)
      secs = Number(secs)
      secs++
      if (secs === 60) {
        secs = 0
        mins++
      }
      mins = String(mins)
      secs = String(secs)
      if (mins.length < 2) mins = `0${mins}`
      if (secs.length < 2) secs = `0${secs}`
      const time = [mins, secs].join(':')
      this.setState({ timerTime: time })
    }, 1000)
  }

  timerOff = () => {
    clearInterval(this.timer)
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
          <input
            className="toggle"
            type="checkbox"
            id={id}
            onChange={() => {
              this.timerOff()
              changeActiveStatus(id)
            }}
          />
          <label htmlFor={id}>
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.timerOn}></button>
              <button className="icon icon-pause" onClick={this.timerOff}></button>
              {` ${this.state.timerTime} `}
            </span>
            <span className="description">{`created ${formatDistanceToNow(timestamp, {
              includeSeconds: true,
            })} ago`}</span>
          </label>
          <button
            className="icon icon-edit"
            aria-label="Edit"
            title="edit"
            onClick={() => {
              this.setState({ isChanging: true })
              activateChangeAction(id)
            }}
          ></button>
          <button
            aria-label="Delete"
            title="delete"
            className="icon icon-destroy"
            onClick={() => {
              deleteItem(id)
            }}
          ></button>
        </div>
        <label htmlFor={`changeInput_${id}`} style={{ padding: 0 }}></label>
        <input
          ref={(changeInput) => changeInput && changeInput.focus()}
          type="text"
          className="edit"
          id={`changeInput_${id}`}
          defaultValue={text}
          onChange={(event) => {
            handleInputChange(this, event)
          }}
          onKeyPress={(event) => {
            if (event.key !== 'Enter') return
            updateItemText(id, this.state.value, event.target.defaultValue)
          }}
        />
      </li>
    )

    return isFiltered ? element : null
  }
}
