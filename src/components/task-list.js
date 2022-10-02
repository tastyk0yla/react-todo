import Task from "./task.js";

const TaskList = ({data}) => {
    const TodoList = data.map((item) => {
      return (
        <Task data={item} key={item.text}/>
      )
    });
    return (
      <ul className="todo-list">
        { TodoList }
      </ul>
    )
  }

export default TaskList;