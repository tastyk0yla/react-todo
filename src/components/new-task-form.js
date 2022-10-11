import { Component } from "react";

export default class NewTaskForm extends Component {
  
  state = {
    value: ''
  }

  render(){
    const { addNewItem, handleInputChange } = this.props;

    return (
      <input 
        className="new-todo" 
        placeholder="What needs to be done?" 
        value={this.state.value}
        onChange={ (event) => {
          handleInputChange(this, event)
        }}
        onKeyPress= { (event) => {
          if (event.key !== 'Enter' || !event.target.value) return
          this.setState( (state)=> {
            addNewItem(state.value)
            event.target.value = '';
            return {value: ''}
          })
        }}
        autoFocus
      />
    )
  };
};
