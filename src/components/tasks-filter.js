const TasksFilter = (props) =>{
  const { changeFilter, activeFilter } = props;
  
    return (
        <ul className="filters">
          <li key='btn-selected'>
            <button 
              className={ activeFilter === 'all'? "selected" : null }
              onClick={ () => changeFilter('all')}
            >All</button>
          </li>
          <li key='btn-active'>
            <button
              className={ activeFilter === 'active'? "selected" : null }
              onClick={ () => changeFilter('active')}
            >Active</button>
          </li>
          <li key='btn-completed'>
            <button 
              className={ activeFilter === 'completed'? "selected" : null }
              onClick={ () => changeFilter('completed')}
            >Completed</button>
          </li>
        </ul>
    )
}

export default TasksFilter;