import Task from '../Task'

const TaskList = (props) => {
  const {
    list,
    activeFilter,
    deleteItem,
    changeActiveStatus,
    activateChangeAction,
    updateItemText,
    handleInputChange,
  } = props
  const TodoList = list.map((item) => {
    return (
      <Task
        item={item}
        key={item.id}
        deleteItem={deleteItem}
        changeActiveStatus={changeActiveStatus}
        activateChangeAction={activateChangeAction}
        updateItemText={updateItemText}
        handleInputChange={handleInputChange}
        activeFilter={activeFilter}
        id={item.id}
      />
    )
  })
  return <ul className="todo-list">{TodoList}</ul>
}

export default TaskList
