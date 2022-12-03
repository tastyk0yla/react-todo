import { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  generateItemState = (text, min, sec) => {
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

  state = {
    data: [],
    filter: 'all',
    mainTarget: true,
  }

  addNewItem = (itemState) => {
    const { value: text, min, sec } = itemState
    if (!text || !min || !sec) return
    this.setState((state) => {
      const newItemState = this.generateItemState(text, min, sec)
      const newDataArray = [newItemState, ...state.data]
      return { data: newDataArray }
    })
  }

  getItems = (id, arr) => {
    const idx = arr.findIndex((item) => item.id === id)
    return [idx, arr.slice(0, idx), arr.slice(idx + 1)]
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const [, before, after] = this.getItems(id, data)
      const newArr = [...before, ...after]
      return { data: newArr }
    })
  }

  changeActiveStatus = (id) => {
    this.setState(({ data }) => {
      const [idx, before, after] = this.getItems(id, data)
      const el = { ...data[idx], isCompleted: !data[idx].isCompleted }
      const newArr = [...before, el, ...after]
      return { data: newArr }
    })
  }

  activateChangeAction = (id) => {
    this.setState(({ data }) => {
      const [idx, before, after] = this.getItems(id, data)
      const el = { ...data[idx], isChanging: !data[idx].isChanging }
      const newArr = [...before, el, ...after]
      return { data: newArr, mainTarget: false }
    })
  }

  getItemsLeft = () => {
    return this.state.data.reduce((itemsLeft, item) => {
      if (!item.isCompleted) itemsLeft++
      return itemsLeft
    }, 0)
  }

  clearCompleted = () => {
    const items = this.state.data.filter((item) => item.isCompleted)
    items.forEach((item) => {
      this.deleteItem(item.id)
    })
  }

  updateItemText = (id, text, def) => {
    if (!text && !def) {
      this.deleteItem(id)
      return
    }
    this.setState(({ data }) => {
      const [idx, before, after] = this.getItems(id, data)
      const el = { ...data[idx], text: text || def, isChanging: false }
      const newArr = [...before, el, ...after]
      return { data: newArr, mainTarget: true }
    })
  }

  handleInputChange = function (state, event) {
    const value = event.target.value
    state.setState({ value })
  }

  changeFilter = (newFilter) => {
    this.setState({ filter: newFilter })
    console.log(this.state)
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            addNewItem={this.addNewItem}
            handleInputChange={this.handleInputChange}
            mainTarget={this.state.mainTarget}
          />
        </header>
        <section className="main">
          <TaskList
            data={this.state.data}
            deleteItem={this.deleteItem}
            changeActiveStatus={this.changeActiveStatus}
            activateChangeAction={this.activateChangeAction}
            updateItemText={this.updateItemText}
            handleInputChange={this.handleInputChange}
            activeFilter={this.state.filter}
          />
          <Footer
            itemsLeft={this.getItemsLeft()}
            clearCompleted={this.clearCompleted}
            changeFilter={this.changeFilter}
            activeFilter={this.state.filter}
          />
        </section>
      </section>
    )
  }
}
