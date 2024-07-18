import React, { useState, useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '' || description.trim() === '') return;

    if (itemToEdit) {
      const updatedTodo = { ...itemToEdit, taskName, description, priority };
      fetch(`http://localhost:5000/todos/${itemToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
        .then(response => response.json())
        .then(() => {
          setTodos(todos.map(todo =>
            todo.id === itemToEdit.id ? updatedTodo : todo
          ));
          setItemToEdit(null);
        });
    } else {
      const newTodo = { id: Date.now(), taskName, description, priority };
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })
        .then(response => response.json())
        .then(todo => setTodos([...todos, todo]));
    }

    setTaskName('');
    setDescription('');
    setPriority('Low');
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(item => item.id !== id));
      });
  };

  const handleEdit = (item) => {
    setTaskName(item.taskName);
    setDescription(item.description);
    setPriority(item.priority);
    setItemToEdit(item);
  };

  const filteredTodos = todos.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'white';
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Search...🔍"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <form onSubmit={handleAddOrEdit} className="todo-form">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">{itemToEdit ? 'Update' : 'Add'}</button>
      </form>
      <div className="todo-list">
        {filteredTodos.map(item => (
          <div key={item.id} style={{ backgroundColor: getPriorityColor(item.priority) }} className="todo-item">
            <h2>{item.taskName}</h2>
            <p>{item.description}</p>
            <p>{item.priority}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
