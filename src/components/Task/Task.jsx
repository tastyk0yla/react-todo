import { React, useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = (props) => {
  const [text, setText] = useState('')
  const [timerTime, setTimerTime] = useState('00:00')

  let timer

  const timerOn = () => {
    if (timer) return
    timer = setInterval(() => {
      let [mins, secs] = timerTime.split(':')
      mins = Number(mins)
      secs = Number(secs)
      if (mins + secs === 0) return
      if (secs === 0) {
        secs = 60
        mins--
      }
      secs--
      mins = String(mins)
      secs = String(secs)
      if (mins.length < 2) mins = `0${mins}`
      if (secs.length < 2) secs = `0${secs}`
      const time = [mins, secs].join(':')
      setTimerTime(time)
    }, 1000)
  }

  const timerOff = () => {
    clearInterval(timer)
    timer = undefined
  }

  useEffect(() => {
    const { text, originalTimer: timerTime } = props.item
    setText(text)
    setTimerTime(timerTime)
  }, [])

  const {
    item,
    deleteItem,
    changeActiveStatus,
    activateChangeAction,
    updateItemText,
    handleInputChange,
    activeFilter,
  } = props

  const { timestamp, isCompleted, isChanging, id } = item

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
            timerOff()
            changeActiveStatus(id)
          }}
        />
        <label htmlFor={id}>
          <span className="title">{text}</span>
          <span className="description">
            <button className="icon icon-play" onClick={timerOn} aria-label="Play" title="Play"></button>
            <button className="icon icon-pause" onClick={timerOff} aria-label="Pause" title="Pause"></button>
            {` ${timerTime} `}
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
        defaultValue={text.trim()}
        onChange={(event) => {
          handleInputChange(setText, event)
        }}
        onKeyPress={(event) => {
          if (event.key !== 'Enter') return
          updateItemText(id, text, event.target.defaultValue)
        }}
      />
    </li>
  )

  return isFiltered ? element : null
}

export default Task
