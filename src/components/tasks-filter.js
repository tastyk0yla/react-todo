const TasksFilter = () =>{
    return (
        <ul className="filters">
          <li key='btn-selected'>
            <button className="selected">All</button>
          </li>
          <li key='btn-active'>
            <button>Active</button>
          </li>
          <li key='btn-completed'>
            <button>Completed</button>
          </li>
        </ul>
    )
}

export default TasksFilter;