import React, { FormEvent, useState } from 'react';
import './App.css';

type Todo = {
  id: number,
  title: string,
  completed: boolean
};

function App() {
  const [title, setTitle] = useState('');

  const [todoItems, setTodo] = useState<Todo[]>([]);

  const addTodo = (value: string) => {
    const todo = [...todoItems];
    
    todo.push({
      id: 1,
      title: value,
      completed: false
    });

    setTodo(todo);
  }

  const updateTodo = (index: number) => {
    const currentTodoItem = [...todoItems];

    const target = currentTodoItem[index];
    target.completed = !target.completed;

    setTodo(currentTodoItem);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(title);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Please input...' />
        <input type="submit" value="TODOを追加する" />
      </form>
      {todoItems.map((item, index) => {
        if(item.title.length === 0) {
          return;
        }

        return item.completed ?
          <div key={index}><input type="checkbox" onChange={() => updateTodo(index)} /><label className='done'>{item.title}</label></div>:
          <div key={index}><input type="checkbox" onChange={() => updateTodo(index)} /><label>{item.title}</label></div>;
      })}
    </div>
  );
}

export default App;
