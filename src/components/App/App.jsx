import { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

const App = () => {
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('all')
  const [mainTarget, setMainTarget] = useState(true)

  const generateItemState = (text, min, sec) => {
    const id = Math.random() * 10 * (Math.random() * 10) * 100
    const originalTimer = [min, sec].join(':')
    return {
      text,
      originalTimer,
      id,
      isCompleted: false,
      isChanging: false,
      timestamp: new Date().getTime(),
    }
  }

  const addNewItem = (itemState) => {
    const { text, min, sec } = itemState
    if (!text || !min || !sec) return

    setList((list) => {
      const newItemState = generateItemState(text, min, sec)
      return [newItemState, ...list]
    })
  }

  const getItems = (id, arr) => {
    const idx = arr.findIndex((item) => item.id === id)
    return [idx, arr.slice(0, idx), arr.slice(idx + 1)]
  }

  const deleteItem = (id) => {
    setList((list) => {
      const [, before, after] = getItems(id, list)
      return [...before, ...after]
    })
  }

  const changeActiveStatus = (id) => {
    setList((list) => {
      const [idx, before, after] = getItems(id, list)
      const el = { ...list[idx], isCompleted: !list[idx].isCompleted }
      return [...before, el, ...after]
    })
  }

  const activateChangeAction = (id) => {
    setList((list) => {
      const [idx, before, after] = getItems(id, list)
      const el = { ...list[idx], isChanging: !list[idx].isChanging }
      return [...before, el, ...after]
    })
    setMainTarget(false)
  }

  const getItemsLeft = () => {
    return list.reduce((itemsLeft, item) => {
      if (!item.isCompleted) itemsLeft++
      return itemsLeft
    }, 0)
  }

  const clearCompleted = () => {
    const items = list.filter((item) => item.isCompleted)
    items.forEach((item) => {
      deleteItem(item.id)
    })
  }

  const updateItemText = (id, text, def) => {
    if (!text && !def) {
      deleteItem(id)
      return
    }
    setList((list) => {
      const [idx, before, after] = getItems(id, list)
      const el = { ...list[idx], text: text || def, isChanging: false }
      return [...before, el, ...after]
    })
    setMainTarget(true)
  }

  ///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleInputChange = function (hook, event) {
    hook(event.target.value)
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addNewItem={addNewItem} handleInputChange={handleInputChange} mainTarget={mainTarget} />
      </header>
      <section className="main">
        <TaskList
          list={list}
          deleteItem={deleteItem}
          changeActiveStatus={changeActiveStatus}
          activateChangeAction={activateChangeAction}
          updateItemText={updateItemText}
          handleInputChange={handleInputChange}
          activeFilter={filter}
        />
        <Footer
          itemsLeft={getItemsLeft()}
          clearCompleted={clearCompleted}
          changeFilter={changeFilter}
          activeFilter={filter}
        />
      </section>
    </section>
  )
}

export default App
