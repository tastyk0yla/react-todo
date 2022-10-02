const Task = ( { data } ) => {
    const { text, className, created } = data;
    return (
      <li className={className} key={text}>
        <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                  <span className="description">{ text }</span>
                  <span className="created">{ created }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
              </div>
              { className === 'editing'? <input type="text" className="edit" defaultValue="Editing task"/> : null}
      </li>
    )
  }

export default Task;