import { Component } from "react";
import Task from "./task.js";

export default class TaskList extends Component {

  render(){
    const { data, deleteItem, changeActiveStatus, activateChangeAction, updateItemText, handleInputChange, activeFilter } = this.props;
    const TodoList = data.map((item) => {;
      return (
        <Task 
          data={item} 
          key={item.id} 
          deleteItem={deleteItem}
          changeActiveStatus={changeActiveStatus}
          activateChangeAction={activateChangeAction}
          updateItemText={updateItemText}
          handleInputChange={handleInputChange}
          activeFilter={activeFilter}
        />
      )
    });
    return (
      <ul className="todo-list">
        { TodoList }
      </ul>
    )
  }
}
