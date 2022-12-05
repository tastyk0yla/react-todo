import { useState } from 'react'

const NewTaskForm = (props) => {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const handleTimeInputChange = (value, minOrSec) => {
    if (isNaN(value) || value > 60 || value < 0 || value.length > 2 || !value) return
    if (minOrSec === 'min') setMin(value)
    else if (minOrSec === 'sec') setSec(value)
  }

  const { addNewItem, handleInputChange, mainTarget } = props

  return (
    <form
      className="new-todo-form"
      onKeyPress={(event) => {
        const value = text.trim()
        if (event.key !== 'Enter' || !value) return
        if (!value) return
        addNewItem({ text, min, sec })
        setText('')
        setMin('')
        setSec('')
        event.target.value = ''
      }}
    >
      <input
        aria-label="New task"
        className="new-todo"
        id="newTask"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => {
          handleInputChange(setText, event)
        }}
        autoFocus={mainTarget}
      />
      <label htmlFor="newTask"></label>
      <input
        className="new-todo-form__timer"
        id="newTaskMin"
        placeholder="Min"
        value={min}
        onChange={(event) => {
          handleTimeInputChange(event.target.value, 'min')
        }}
      ></input>
      <label htmlFor="newTaskMin"></label>
      <input
        className="new-todo-form__timer"
        id="newTaskSec"
        placeholder="Sec"
        value={sec}
        onChange={(event) => {
          handleTimeInputChange(event.target.value, 'sec')
        }}
      ></input>
      <label htmlFor="newTaskSec"></label>
    </form>
  )
}

export default NewTaskForm
