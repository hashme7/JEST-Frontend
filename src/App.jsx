import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

// Move styles outside component to prevent recreation
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  error: {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #000',
    backgroundColor: '#ffebee',
    color: '#d32f2f'
  },
  errorButton: {
    float: 'right',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  createSection: {
    marginBottom: '30px',
    padding: '15px',
    border: '1px solid #000'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #000'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #000',
    resize: 'vertical'
  },
  button: {
    padding: '10px 20px',
    border: '1px solid #000',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  buttonDisabled: {
    padding: '10px 20px',
    border: '1px solid #000',
    backgroundColor: '#fff',
    cursor: 'not-allowed',
    opacity: 0.6
  },
  todoItem: {
    marginBottom: '15px',
    padding: '15px',
    border: '1px solid #000',
    backgroundColor: '#fff'
  },
  todoItemCompleted: {
    marginBottom: '15px',
    padding: '15px',
    border: '1px solid #000',
    backgroundColor: '#f5f5f5'
  },
  todoHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  checkbox: {
    marginRight: '10px',
    transform: 'scale(1.2)'
  },
  todoTitle: {
    margin: '0',
    flex: 1
  },
  todoTitleCompleted: {
    margin: '0',
    textDecoration: 'line-through',
    color: '#666',
    flex: 1
  },
  description: {
    margin: '0 0 10px 0',
    color: '#333',
    lineHeight: '1.4'
  },
  descriptionCompleted: {
    margin: '0 0 10px 0',
    color: '#666',
    lineHeight: '1.4'
  },
  metadata: {
    fontSize: '0.8em',
    color: '#666',
    marginBottom: '10px'
  },
  smallButton: {
    padding: '5px 10px',
    marginRight: '5px',
    border: '1px solid #000',
    backgroundColor: '#fff',
    cursor: 'pointer'
  }
};

  const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [editingTodo, setEditingTodo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = 'https://2rr8ntqtuj.execute-api.us-east-1.amazonaws.com/Prod/';

    // Memoize filtered todos to prevent unnecessary filtering
    const activeTodos = useMemo(() => 
      todos.filter(todo => !todo.isDeleted), 
      [todos]
    );

    // Fetch all todos - useCallback to prevent recreating function
    const fetchTodos = useCallback(async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}`);
        setTodos(response.data);
      } catch (error) {
        console.log("ERROR:", error);
        setError('Error fetching todos: ' + error.message);
      } finally {
        setLoading(false);
      }
    }, [API_BASE_URL]);
  console.log("API_BASE_URL:", API_BASE_URL);
  // Create a new todo - useCallback to prevent recreating
  const createTodo = useCallback(async () => {
    if (!newTodo.title.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo.title,
          description: newTodo.description,
          userId: 'anonymous'
        })
      });

      if (response.ok) {
        setNewTodo({ title: '', description: '' });
        await fetchTodos();
        setError('');
      } else {
        setError('Failed to create todo');
      }
    } catch (err) {
      setError('Error creating todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [newTodo.title, newTodo.description, fetchTodos, API_BASE_URL]);

  // Update a todo - useCallback
  const updateTodo = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        setEditingTodo(null);
        await fetchTodos();
        setError('');
      } else {
        setError('Failed to update todo');
      }
    } catch (err) {
      setError('Error updating todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTodos, API_BASE_URL]);

  // Delete a todo - useCallback
  const deleteTodo = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchTodos();
        setError('');
      } else {
        setError('Failed to delete todo');
      }
    } catch (err) {
      setError('Error deleting todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTodos, API_BASE_URL]);

  // Toggle todo completion - useCallback
  const toggleComplete = useCallback(async (todo) => {
    await updateTodo(todo._id, { completed: !todo.completed });
  }, [updateTodo]);

  // Handle Enter key press - useCallback
  const handleKeyPress = useCallback((e, callback) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callback();
    }
  }, []);

  // Memoized event handlers for new todo form
  const handleTitleChange = useCallback((e) => {
    setNewTodo(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setNewTodo(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handleKeyPressCreate = useCallback((e) => {
    handleKeyPress(e, createTodo);
  }, [handleKeyPress, createTodo]);

  const clearError = useCallback(() => setError(''), []);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Extract EditForm to separate component to prevent recreation
  const EditForm = React.memo(({ todo, onSave, onCancel }) => {
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');

    const handleSave = useCallback(() => {
      if (editTitle.trim()) {
        onSave(todo._id, { title: editTitle, description: editDescription });
      }
    }, [editTitle, editDescription, onSave, todo._id]);

    const handleKeyPressEdit = useCallback((e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    }, [handleSave]);

    return (
      <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #000' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyPress={handleKeyPressEdit}
            style={styles.input}
            placeholder="Todo title"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
            style={styles.textarea}
            rows="2"
          />
        </div>
        <button onClick={handleSave} style={styles.smallButton}>
          Save
        </button>
        <button onClick={onCancel} style={styles.smallButton}>
          Cancel
        </button>
      </div>
    );
  });

  // Extract TodoItem to separate component to prevent recreation
  const TodoItem = React.memo(({ todo, onEdit, onDelete, onToggle }) => {
    const handleEdit = useCallback(() => onEdit(todo._id), [onEdit, todo._id]);
    
    const handleDelete = useCallback(() => {
      if (window.confirm('Are you sure you want to delete this todo?')) {
        onDelete(todo._id);
      }
    }, [onDelete, todo._id]);

    const handleToggle = useCallback(() => onToggle(todo), [onToggle, todo]);

    return (
      <div style={todo.completed ? styles.todoItemCompleted : styles.todoItem}>
        <div style={styles.todoHeader}>
          <input
            type="checkbox"
            checked={todo.completed || false}
            onChange={handleToggle}
            style={styles.checkbox}
          />
          <h3 style={todo.completed ? styles.todoTitleCompleted : styles.todoTitle}>
            {todo.title}
          </h3>
        </div>
        
        {todo.description && (
          <p style={todo.completed ? styles.descriptionCompleted : styles.description}>
            {todo.description}
          </p>
        )}
        
        <div style={styles.metadata}>
          Created: {new Date(todo.createdAt).toLocaleDateString()}
          {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
            <span> | Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
          )}
        </div>
        
        <div>
          <button onClick={handleEdit} style={styles.smallButton}>
            Edit
          </button>
          <button onClick={handleDelete} style={styles.smallButton}>
            Delete
          </button>
        </div>
      </div>
    );
  });

  const handleEditTodo = useCallback((id) => setEditingTodo(id), []);
  const handleCancelEdit = useCallback(() => setEditingTodo(null), []);

  const isCreateDisabled = loading || !newTodo.title.trim();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>

      {error && (
        <div style={styles.error}>
          {error}
          <button onClick={clearError} style={styles.errorButton}>
            ×
          </button>
        </div>
      )}

      {/* Create Todo Section */}
      <div style={styles.createSection}>
        <h2 style={{ marginTop: '0' }}>Add New Todo</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Todo title"
            value={newTodo.title}
            onChange={handleTitleChange}
            onKeyPress={handleKeyPressCreate}
            style={styles.input}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={handleDescriptionChange}
            style={styles.textarea}
            rows="3"
          />
        </div>
        <button 
          onClick={createTodo}
          disabled={isCreateDisabled}
          style={isCreateDisabled ? styles.buttonDisabled : styles.button}
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </div>

      {/* Todos List */}
      <div>
        <h2>Your Todos ({activeTodos.length})</h2>
        
        {loading && activeTodos.length === 0 ? (
          <p>Loading todos...</p>
        ) : activeTodos.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666', textAlign: 'center', padding: '20px' }}>
            No todos yet. Add one above!
          </p>
        ) : (
          <div>
            {activeTodos.map((todo) => (
              editingTodo === todo._id ? (
                <EditForm
                  key={todo._id}
                  todo={todo}
                  onSave={updateTodo}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onEdit={handleEditTodo}
                  onDelete={deleteTodo}
                  onToggle={toggleComplete}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;