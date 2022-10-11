import TasksFilter from "./tasks-filter.js";

const Footer = (props) => {
  const { itemsLeft, clearCompleted, changeFilter, activeFilter } = props;
    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <TasksFilter 
          changeFilter={changeFilter}
          activeFilter={activeFilter}
        />
        <button 
          className="clear-completed"
          onClick={ clearCompleted}
        >Clear completed</button>
      </footer>
    )
  }

export default Footer;
