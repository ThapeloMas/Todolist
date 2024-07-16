// src/components/TodoList.js

import React, { useState, useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (description.trim() === '') return;

    if (itemToEdit) {
      setTodos(todos.map(todo => 
        todo.id === itemToEdit.id ? { ...todo, description, priority } : todo
      ));
      setItemToEdit(null);
    } else {
      setTodos([...todos, { id: Date.now(), description, priority }]);
    }

    setDescription('');
    setPriority('Low');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
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
        placeholder="Search...🔍 " 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <form onSubmit={handleAddOrEdit} className="todo-form">
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
