import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // 从localStorage加载数据
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 保存到localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString('zh-CN')
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">✨ 精美待办清单</h1>
          <p className="subtitle">让生活更有条理</p>
        </header>

        <div className="input-section">
          <div className="input-container">
            <input
              type="text"
              className="todo-input"
              placeholder="添加新的待办事项..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="add-button" onClick={addTodo}>
              <span>+</span>
            </button>
          </div>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部 ({todos.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            待完成 ({activeTodosCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            已完成 ({todos.length - activeTodosCount})
          </button>
        </div>

        <div className="todos-container">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p className="empty-text">
                {filter === 'all' && '还没有待办事项，开始添加一些吧！'}
                {filter === 'active' && '没有待完成的事项，真棒！'}
                {filter === 'completed' && '还没有完成的事项'}
              </p>
            </div>
          ) : (
            <ul className="todos-list">
              {filteredTodos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <button
                      className="todo-checkbox"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed && <span className="checkmark">✓</span>}
                    </button>
                    <div className="todo-text-container">
                      <span className="todo-text">{todo.text}</span>
                      <span className="todo-time">{todo.createdAt}</span>
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <span>×</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {todos.some(todo => todo.completed) && (
          <div className="actions">
            <button className="clear-completed" onClick={clearCompleted}>
              清除已完成 ({todos.length - activeTodosCount})
            </button>
          </div>
        )}

        <footer className="footer">
          <p>使用 React 18 构建 ❤️</p>
        </footer>
      </div>
    </div>
  );
}

export default App; 