import React, { Component } from 'react';

class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTodo: ''
        }
    }
    onChangeVal = (e) => {
        this.setState({currentTodo: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.currentTodo.trim()) return;
        var todo = {
            text: this.state.currentTodo,
            completed: false
        };
        this.props.addTodo(todo);
        this.setState({currentTodo: ''});
    }
    render() {
        const { currentTodo } = this.state;
        return (
            <div>
                <form className='todos-form'
                      onSubmit={this.onSubmit}>
                    <input className='todo-input'
                           type='text'
                           value={currentTodo}
                           onChange={this.onChangeVal}
                           autoFocus={true}
                           placeholder='What needs to be done for today?'/>
                    <button type='submit'
                            onClick={this.onSubmit}>+</button>
                </form>
            </div>
        );
    };
}

export default AddTodo;
