const TasksFilter = (props) => {
  const { changeFilter, activeFilter } = props

  return (
    <ul className="filters">
      <li key="btn-selected">
        <button
          aria-label="Filter by all tasks"
          className={activeFilter === 'all' ? 'selected' : null}
          onClick={() => changeFilter('all')}
        >
          All
        </button>
      </li>
      <li key="btn-active">
        <button
          aria-label="Filter by only active tasks"
          className={activeFilter === 'active' ? 'selected' : null}
          onClick={() => changeFilter('active')}
        >
          Active
        </button>
      </li>
      <li key="btn-completed">
        <button
          aria-label="Filter by only completed tasks"
          className={activeFilter === 'completed' ? 'selected' : null}
          onClick={() => changeFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
