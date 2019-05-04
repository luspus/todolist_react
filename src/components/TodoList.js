import React  from 'react';

const TodoList = (props) => {
    const { todos, deleteTodo, editTodo, toggleTodo } =  props;
    return (
        <div className='todos-list'>
          {todos.length > 0
              ?
                  <div>{todos.filter(todo => todo.completed === false).length} to do for you</div>
              :
                  <div>No todos yet</div>
          }
          {todos.map((todo, id) => {
              return (<div key={id}>
                        <input type='checkbox'
                               checked={todo.completed ? true : false}
                               onChange={() => toggleTodo(id)}
                        />
                        <input className={todo.completed ? 'completed-inp text-inp' : 'text-inp'}
                               value={todo.text}
                               style={{
                                   textDecoration: todo.completed ? 'line-through' : 'none'
                               }}
                               onChange={(e) => editTodo(e.target.value, id)}
                        >
                        </input>
                        <button className='destroy-btn'
                                onClick={() => deleteTodo(id)}
                        />
                      </div>);
          })}
        </div>
    );
};

export default TodoList;
