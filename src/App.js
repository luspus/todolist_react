import React, { Component } from 'react';
import AddTodo from './components/AddTodo';
import Popup from './components/Popup';
import TodoList from './components/TodoList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            user: null
        };
    }
    componentDidMount() {
        const rememberme = sessionStorage.getItem('rememberme') === 'true';
        const passTodo = rememberme ? JSON.parse(sessionStorage.getItem(
            'todosSerialized') || '[]') : this.state.todos;

        this.setState({
            todos: [...passTodo]
        });
    }
    putIntoSessionStorage = () => {
        const rememberme = sessionStorage.getItem('rememberme') === 'true';
        if(rememberme) sessionStorage.setItem('todosSerialized', JSON.stringify(this.state.todos));
    }
    saveUserName = (state) => {
        this.setState({user: state.user});
        sessionStorage.setItem('rememberme', state.checkbox);
        if(state.checkbox) sessionStorage.setItem('user', state.user);
    }
    addTodo = (item) => {
        this.setState({
            todos: [...this.state.todos, item]
        }, () => {
            this.putIntoSessionStorage();
        });
    }
    toggleTodo = (id) => {
        this.setState({todos:  this.state.todos.map((todo, i) => {
            if(id === i) {
                todo.completed = !todo.completed;
            }
            return todo;
        })}, () => {
            this.putIntoSessionStorage();
        });
    }
    deleteTodo = (id) => {
        this.setState({
            todos: [...this.state.todos.filter((todo, i) => id !== i)]
        }, () => {
            this.putIntoSessionStorage();
        });
    }
    editTodo = (text, editId) => {
        this.setState({
            todos: this.state.todos.map((todo, id) => {
                if (editId === id) {
                    todo.text = text;
                }
                return todo;
            })}, () => {
            this.putIntoSessionStorage();
        });
    }
    exit = () => {
        sessionStorage.clear();
        this.setState({todos: [], user: null});
    }
    render() {
        const user = sessionStorage.getItem('user') || this.state.user;
        const rememberme = sessionStorage.getItem('rememberme') === 'true';
        return (
            <div className='container'>
                {!rememberme && user === null
                    ?
                        <Popup saveUserName={this.saveUserName}/>
                    :
                    <>
                        {!rememberme && user === '' ?
                            <div className='greeting'>Hello</div>
                            :
                            <>
                                <div className='greeting'>Hello, {user}</div>
                                <button className='btn-exit' onClick={this.exit}>Exit</button>
                            </>
                        }
                        <div className='todos-content'>
                            <AddTodo addTodo={this.addTodo} />
                            <TodoList todos={this.state.todos}
                                      toggleTodo={this.toggleTodo}
                                      deleteTodo={this.deleteTodo}
                                      editTodo={this.editTodo}
                            />
                        </div>
                    </>
                }
            </div>
        );
    };
}

export default App;
