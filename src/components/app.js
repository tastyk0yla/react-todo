import { Component } from 'react';

import NewTaskForm from './new-task-form.js';
import TaskList from './task-list.js';
import Footer from './footer.js';

export default class App extends Component {

  generateItemState = (text) => {
    const id = Math.random() * 10 * ( Math.random() * 10) * 100;
    return {
      text, 
      id, 
      isCompleted: false, 
      isChanging: false,
      timestamp: new Date().getTime(), 
    }
  }

  state = {
    data : [
      this.generateItemState('Completed task'),
      this.generateItemState('Editing task'),
      this.generateItemState('Active task'),
    ],
    filter : 'all'
  };
  
  addNewItem = (text) =>  {
    this.setState( (state) => {
      const newItemState = this.generateItemState(text);
      const newArr = [...state.data, newItemState];
      return {data: newArr}
    } )
  };

  getItems = (id, arr) => {
    const idx = arr.findIndex((item)=> item.id === id);
    return [idx, arr.slice(0, idx), arr.slice(idx + 1)]
  };

  deleteItem = (id) => {
    this.setState( ({data}) => {
      const [, before, after] = this.getItems(id, data);
      const newArr = [...before, ...after];
      return {data: newArr}
    })
  }

  changeActiveStatus = (id) => {
    this.setState( ({ data }) =>{
      const [idx, before, after] = this.getItems(id, data);
      const el = { ...data[idx], isCompleted: !data[idx].isCompleted};
      const newArr = [...before, el, ...after];
      return {data: newArr}
    })
  }

  activateChangeAction = (id) => {
    this.setState( ({ data }) => {
      const [idx, before, after] = this.getItems(id, data);
      const el = { ...data[idx], isChanging: !data[idx].isChanging};
      const newArr = [...before, el, ...after];
      return {data: newArr}
    })
  }

  getItemsLeft = () => {
    return this.state.data.reduce( (itemsLeft, item) => {
      if (!item.isCompleted) itemsLeft++;
      return itemsLeft
    }, 0);
  }

  clearCompleted = () => {
    const items = this.state.data.filter( (item) => item.isCompleted);
    items.forEach(item => {
      this.deleteItem(item.id);
    });
  }

  updateItemText = (id, text) => {
    this.setState( ({data}) => { 
      console.log(text);
      const [idx, before, after] = this.getItems(id, data);
      const el = { ...data[idx], text: text, isChanging: false};
      const newArr = [...before, el, ...after];
      return {data: newArr}
    } )
  }

   handleInputChange = function (state, event) {
    state.setState({value: event.target.value});
   } 

   changeFilter = (newFilter) => {
    this.setState({filter : newFilter})
    console.log(this.state)
   }

  render(){
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm 
            addNewItem={this.addNewItem}
            handleInputChange={this.handleInputChange}
          /> 
        </header>
        <section className='main'>
          <TaskList 
            data={this.state.data} 
            deleteItem={ this.deleteItem} 
            changeActiveStatus={this.changeActiveStatus}
            activateChangeAction={this.activateChangeAction}
            updateItemText={this.updateItemText}
            handleInputChange={this.handleInputChange}
            activeFilter={this.state.filter}
          />
          <Footer 
            itemsLeft={this.getItemsLeft()} 
            clearCompleted={ this.clearCompleted } 
            changeFilter={this.changeFilter}
            activeFilter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
