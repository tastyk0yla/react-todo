import { Component } from "react";
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {

  state = {
    value: ''
  };

  render(){
    const { data, deleteItem, changeActiveStatus, activateChangeAction, updateItemText, handleInputChange, activeFilter } = this.props;
    const { text, timestamp, isCompleted, isChanging, id} = data;
    
    let classStr = '';
    if (isCompleted) classStr+= ' completed';
    if (isChanging) classStr+= ' editing';

    const isFilterMatchingActive = (activeFilter === 'active') && !isCompleted;
    const isFilterMatchingcompleted = (activeFilter === 'completed') && isCompleted;

    const isFiltered = (activeFilter === 'all') || isFilterMatchingActive || isFilterMatchingcompleted? true : false ;

    const element = (
      <li className={ classStr }>
        <div className="view">
                <input className="toggle" type="checkbox"/>
                <label onClick={ () => {
                  changeActiveStatus(id)
                }}>
                  <span className="description">{ text }</span>
                  <span className="created">{ formatDistanceToNow(timestamp) }</span>
                </label>
                <button 
                    className="icon icon-edit"
                    onClick={ () => {
                      activateChangeAction(id)
                    }}
                ></button>
                <button 
                    className="icon icon-destroy"
                    onClick={ () => {
                      deleteItem(id);
                    }}
                ></button>
              </div>
              <input 
                type="text" 
                className="edit" 
                defaultValue={text} 
                onChange={ (event) => {
                  handleInputChange(this, event)
                }}
                onKeyPress={ (event) => {
                  if (event.key !== 'Enter') return
                  updateItemText(id, this.state.value);
                }}
              />
      </li>)

    return isFiltered? element : null
  }
};